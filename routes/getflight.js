/**
 * Created by developer on 3/18/17.
 */
var express = require('express');
var router = express.Router();
var http = require('http');


/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');


});

// Play http://localhost:3000/num_passengers?=1000&arrival_station?=1000&departure_date?=1000&departure_station?=1000?=1000&return_date?=1000
router.get('/*', function (req, res) {
    var num_passengers = req.query.num_passengers;
    var arrival_station = req.query.arrival_station;
    var departure_date = req.query.departure_date;
    var departure_station = req.query.departure_station;
    var return_date = req.query.return_date;

    // Do methods here
    // Get sessions
    var headers = {
        'x-api-key': '15ZwK0zMir6eeiS6sPKKra98vaVWJW1i75bVqzxY',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Auth': 'allow'
    };
    var dataString = 'actionName=GetSession';

    var options = {
        url: 'https://airvolution-api.airasia.com/2017/api/',
        method: 'POST',
        headers: headers,
        body: dataString
    };


    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    http.request(options, callback).end();

    res.json({ user: 'if youre seeing this kev, this may be the end...' });
    res.end('Password: ' + key);

});

module.exports = router;




