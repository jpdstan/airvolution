/**
 * Created by developer on 3/19/17.
 */
/**
 * Created by developer on 3/18/17.
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

router.get('/find/:id', function (req, res, next) {
    //TODO FIND itenerary with ID
    res.send('USER')
} )

//POPULATEusing BODY (PAYLOAD)
router.post('/', function (req, res) {
  var secret = req.body.secret;
  res.end('Password: ' + secret);
});

module.exports = router;

