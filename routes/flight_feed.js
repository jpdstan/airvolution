var express = require('express');
var router = express.Router();
var request = require('request');

const client_id = "56e99f7170ff4ab9801ed2f015d79b1e";
const client_secret = "3ed27344abb3474584cd013c8b786b90";
const host = 'https://airvolution-staging.herokuapp.com';

/* GET flight locations. */
router.get('/', function(req, res) {

  // var user_id = req.query.user_id;
  var code = req.query.code;
  var uri =  'https://api.instagram.com/oauth/access_token';
  var body = {
    client_id : client_id,
    client_secret : client_secret,
    grant_type : 'authorization_code',
    redirect_uri : host + '/flights',
    code : code
  };

  var process_response = function(error, response, body) {
    if (error) {
      // todo
    } else {
      requestLikedPictures(response.body.access_token);
    }
  };

  // make the request to instagram
  request.post(uri, body, process_response);

});

function requestLikedPictures(access_token) {
  var options = {
    uri : 'https://api.instagram.com/v1/users/self/media/liked?access_token=' + access_token + "&count=1",
    method : 'GET'
  };

  var process_response = function(error, response, body) {
    if (error) {

    } else {
      var location_list = body.data; // todo(stan): probably incorrect, hold here for now
      for (var i = 0; i < location_list.length; i++) {
        var location = new Location(location_list[i]);
      }
    }
  };

  request(options, process_response);
}

function Location(loc) {
  this.id = loc.id;
  this.latitude = loc.latitude;
  this.longitude = loc.longitude;
  this.url = loc.images.standard_resolution.url;
}

module.exports = router;
