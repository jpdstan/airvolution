var express = require('express');
var router = express.Router();
var request = require('request');

/* GET flight locations. */
router.get('/', function(req, res) {
  console.log("Getting flight locations....");

  // var user_id = req.query.user_id;
  var access_token = req.query.access_token;

  var options = {
    uri : 'https://api.instagram.com/v1/users/self/media/liked?access_token=' + access_token + "&count=1",
    method : 'GET'
  };

  var process_response = function(error, response, body) {
    if (error) {
      // todo
    } else {
      // todo
    }
  };

  // make the request to instagram
  request(options, process_response);
});

function Location(loc) {
  this.id = loc.id;
  this.latitude = loc.latitude;
  this.longitude = loc.longitude;
  this.url = loc.images.standard_resolution.url;
}

module.exports = router;
