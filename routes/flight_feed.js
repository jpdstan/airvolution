var express = require('express');
var router = express.Router();
var request = require('request-promise');

const client_id = "56e99f7170ff4ab9801ed2f015d79b1e";
const client_secret = "3ed27344abb3474584cd013c8b786b90";
const host = 'https://airvolution-staging.herokuapp.com';

/* GET flight locations. */
router.get('/', function(req, res) {
  console.log("Loading flight feed...");
  // var user_id = req.query.user_id;
  var code = req.query.code;
  var uri =  'https://api.instagram.com/oauth/access_token';
  var options = {
    method : 'POST',
    uri : uri,
    form : {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: 'authorization_code',
      redirect_uri: host + '/flight_feed',
      code: code
    },
    json : true
  };

  function requestLikedPictures(access_token) {
    var options = {
      method : 'GET',
      uri : 'https://api.instagram.com/v1/users/self/media/liked?access_token=' + access_token + "&count=1"
    };

    var process_response = function(response) {
      res.status(200).json(response)
    };

    request(options)
      .then(process_response)
      .catch(function(response) {
        res.sendStatus(400)
      });
  }

  var process_response = function(response) {
    console.log("Successfully processed authorized Instagram user. Response:\n" + response);
    requestLikedPictures(response.access_token);
  };

  // make the request to instagram
  request(options)
    .then(process_response)
    .catch(function (response) {
      console.error(response);
      res.sendStatus(400);
    });

});

function Location(loc) {
  this.id = loc.id;
  this.latitude = loc.latitude;
  this.longitude = loc.longitude;
  this.url = loc.images.standard_resolution.url;
}

module.exports = router;
