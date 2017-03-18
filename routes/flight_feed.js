var express = require('express');
var router = express.Router();
var request = require('request-promise');
const airports = require('../assets/airports.json');

/* Instagram credentials. */
const client_id = "56e99f7170ff4ab9801ed2f015d79b1e";
const client_secret = "3ed27344abb3474584cd013c8b786b90";

const host = 'https://airvolution-staging.herokuapp.com';

/* GET flight locations. */
router.get('/', function(req, res) {
  console.log("Loading flight feed...");
  var code = req.query.code;
  getAccessToken(code)
    .then(requestLikedPictures)
    .then(findAirports);

  /* Form the request to Instagram given CODE in the request query for an ACCESS_TOKEN. */
  function getAccessToken(code) {
    var uri = 'https://api.instagram.com/oauth/access_token';
    var options = {
      method: 'POST',
      uri: uri,
      form: {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'authorization_code',
        redirect_uri: host + '/flight_feed',
        code: code
      },
      json: true
    };

    // Make request for access_token
    return request(options)
      .then(function (response) {
        console.log("Successfully processed authorized Instagram user. Response:\n" + response);
        return response.access_token;
      })
      .catch(function (response) {
        console.trace(response);
        res.sendStatus(400);
      });
  }

  /* Given an ACCESS_TOKEN, return the associated user's recent liked pictures. */
  function requestLikedPictures() {
    var options = {
      method: 'GET',
      uri: 'https://api.instagram.com/v1/users/self/media/liked?access_token=' + access_token + "&count=5"
    };

    return request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (response) {
        console.trace(response);
        res.sendStatus(400);
      });
  }

  /* Given the user's liked PICTURES, calculate the nearest airports. */
  function findAirports(pictures) {
    try {
      var airports = [];
      for (var i = 0; i < pictures.length; i++) {
        if (pictures[i].location != null) {
          var picture = new Picture(pictures[i]);
          var airport = calculateNearestAirport(picture);
          airports.push(airport);
        }
      }

      airports = airports.reduce(function (acc, curr) {
        if (acc[curr.code]) {
          acc[curr.code]['referer_photos'].push(curr.referer_photo);
        } else {
          acc[curr.code]['referer_photos'] = [curr.referer_photo];
          acc[curr.code]['station_name'] = curr.name;
        }
        return acc;
      }, {});

      res.status(200).send({'data' : airports});
    }
    catch (e) {
      e.printStackTrace();
      res.sendStatus(400);
    }
  }
});

function calculateNearestAirport(picture) {
  // ...
}

module.exports = router;
