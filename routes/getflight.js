/**
 * Created by developer on 3/18/17.
 */
var express = require('express');
var router = express.Router();
var http = require('http');


//CRON JOB
var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: '* 4 * * *',
    onTick: function() {

        //Getting session every 4 minutes
        http.get(options, function(resp){
            resp.on('data', function(chunk){
                //do something with chunk
                console.log("HTTP POST: " + chunk);
            });
        }).on("error", function(e){
            console.log("Got error: " + e.message);
        });

    },
    start: false,
    timeZone: 'America/Los_Angeles'
});



/* GET users listing. */
router.get('/yo', function(req, res) {
    res.send('Yo ima getting some sessions now');
    job.start();

});

// Sessions
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



// Play http://localhost:3000/get_flights?num_passengers=1000&arrival_station=1000&departure_date=1000&departure_station=1000=1000&return_date=1000
router.get('/*', function (req, res) {
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




