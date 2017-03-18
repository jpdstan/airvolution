var express = require('express');
var router = express.Router();
var http = require('http');

/* GET flight locations. */
router.get('/', function(req, res) {
  console.log("Getting flight locations....");

  var user_id = req.params['user_id'];
  var access_token = req.params['access_token'];
  var options = {
    host : 'api.instagram.com',
    path : '/v1/users/self/media/liked?access_token=' + access_token + "&count=1",
    method : 'GET'
  };

  console.log(options.path);

  var process_response = function(response) {
    response.on('data', function (data) {
      console.log("From insta: " + data);
      res.sendStatus(200);
    });
    response.on('end', function () {
      console.log("Request sent");
    });
  };

  http.request(options, process_response).end();


});



module.exports = router;
