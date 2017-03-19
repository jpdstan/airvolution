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
    console.log("Getting access token");
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
        console.log("Successfully processed authorized Instagram user. Response:\n" + JSON.stringify(response));
        return response.access_token;
      })
      .catch(function (response) {
        console.trace(response);
        res.sendStatus(400);
      });
  }

  /* Given an ACCESS_TOKEN, return the associated user's recent liked pictures. */
  function requestLikedPictures(access_token) {
    console.log("Requesting liked pictures");
    var options = {
      method: 'GET',
      uri: 'https://api.instagram.com/v1/users/self/media/liked?access_token=' + access_token,
      json: true
    };

    return request(options)
      .then(function (response) {
        return response;
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

      if (!pictures) {
        res.sendStatus(400);
      }
      for (var i = 0; i < pictures['data'].length; i++) {
        if (pictures['data'][i].location != null) {
          var airport = util.getNearestAirport(pictures['data'][i]);
          if (airport != null)
            airports.push(airport);
        }
      }

      console.log(JSON.stringify(airports));

      //airports = airports.reduce(function (acc, curr) {
      //  console.log("Current " + JSON.stringify(curr));
      //  if (acc[Object.keys(curr)[0]]) {
      //    acc[Object.keys(curr)[0]]['referer_photos'].push(curr.referer_photo);
      //  } else {
      //    acc[Object.keys(curr)[0]]['referer_photos'] = [curr.referer_photo];
      //    acc[Object.keys(curr)[0]]['station_name'] = curr.name;
      //  }
      //  return acc;
      //}, {});

      res.status(200).send({'data' : airports});
    }
    catch (e) {
      console.trace(e);
      res.sendStatus(400);
    }
  }
});

module.exports = router;
