/**
 * Created by developer on 3/18/17.
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');




//CRON JOB for refreshing the sessions
var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: '* 3 * * *',
    onTick: function() {

        //Getting session every 3 minutes
        console.log("YOOOO UPDATING SESSION!");
        request(options, function(err, res, body) {
            let json = JSON.parse(body);
            console.log(json);
        });

    },
    start: false,
    timeZone: 'America/Los_Angeles'
});


// Options setting for sessions
var options = {
    url: 'https://airvolution-api.airasia.com/2017/api/',
    method: 'POST',
    headers: headers = {
        'x-api-key': '15ZwK0zMir6eeiS6sPKKra98vaVWJW1i75bVqzxY',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Auth': 'allow'
    },
    body: dataString = 'actionName=GetSession'
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});


// Play http://localhost:3000/get_flights?num_passengers=1000&arrival_station=1000&departure_date=1000&departure_station=1000=1000&return_date=1000
router.get('/*', function (req, res) {
    job.start(); // API Session updates every 4 minutes

    var num_passengers = req.query.num_passengers;
    var arrival_station = req.query.arrival_station;
    var departure_date = req.query.departure_date;
    var departure_station = req.query.departure_station;
    var return_date = req.query.return_date;

    // console.log("GET MESSAGE: "+ num_passengers + " - " + arrival_station + " - " + departure_date + " - ");
    // Do methods here



    res.json({ user: 'if youre seeing this kev, this may be the end...' +  num_passengers});
    res.end('Password: ' + key);

});

module.exports = router;




