var express = require('express');
var router = express.Router();
var http = require('http');

/* GET flight locations. */
router.get('/', function(req, res) {
  console.log("Getting flight locations....");

  var user_id = req.params['user_id'];
  var access_token = req.params['access_token'];
  var count = 50;
  var options = {
    host : 'www.api.instagram.com',
    path : '/v1/users/self/media/liked?access_token=' + access_token + "&count=" + count,
    method : 'GET'
  };
  http.request(options, process_response).end();
});

function process_response(response) {
	response.on('data', function (data) {
		console.log(data);
	});
	response.on('end', function () {
		console.log("Request finished");
	});
}

module.exports = router;
