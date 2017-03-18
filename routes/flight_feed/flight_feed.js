var express = require('express');
var router = express.Router();
var request = require('request-promise');
const airports = require('../../assets/airports.json');

var util = require('./flight_feed.util.js');

/* GET a list of airports and their associated liked Insta photos.
* See documentation for example response.
* */
router.get('/', function(req, res) {
  console.log("Loading flight feed...");
  var code = req.query.code;

  // where the magic happens
  getAccessToken(code)
    .then(requestLikedPictures)
    .then(findAirports);

  /* Form the request to Instagram given CODE in the request query for an ACCESS_TOKEN. */
  function getAccessToken(code) {
    var uri = 'https://api.instagram.com/oauth/access_token';
    var options = {
      method : 'POST',
      uri : uri,
      form : {
        client_id: req.app.locals.INSTA_ID,
        client_secret: req.app.locals.INSTA_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: req.app.locals.HOST + '/flight_feed',
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
  function requestLikedPictures(access_token) {
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
          var airport = util.getNearestAirport(picture);
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