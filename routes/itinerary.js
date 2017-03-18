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


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uri = 'mongodb://fady:fady@ds135680.mlab.com:35680/airvolution';

mongoose.connect(uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// Schema for each saved Itineary page
var itinerary = new Schema({
    destination: String, // Literal Destination (i.e., Phuket, Hong Kong)
    airport: String, // in airport code
    liked_pictures: [String],
    departing_flights: [
        {
            carrier_code: String,
            flight_number: Number,
            STD_UTC: String, // Departure time
            STA_UTC: String, // Arrival time
            estimated_time: String,
            final_cost: Number,
            currency_token: String
        }
    ],
    returning_flights: [
        {
            carrier_code: String,
            flight_number: Number,
            STD_UTC: String, // Departure time
            STA_UTC: String, // Arrival time
            estimated_time: String,
            final_cost: Number,
            currency_token: String
        }
    ],
    updated_at: Date
});

var Itinerary = mongoose.model("Itinerary", itinerary);

// // returns URL for itineary based on id 
// var getUrl = function(id) {
//     // TODO: change to actual hosted url 
//     return "localhost:3000?id=" + id.toString();
// }


// Returning
router.get('/find/:id', function (req, res, next) {
    //TODO FIND itenerary with ID
    Itinerary.find({ id: req.params._id }, function(err, itin) {
        if (err) throw err;
        res.json(itin);
    });
});

//POPULATE using BODY (PAYLOAD)
router.post('/', function (req, res) {
  var itinerary = Itinerary({
    destination: req.body.destination,
    airport: req.body.airport,
    liked_pictures: req.body.liked_pictures,
    departing_flights: req.body.departing_flights,
    returning_flights: req.body.returning_flights,
    updated_at: req.body.updated_at
  });
  console.log("POST YALL \n");
  itinerary.save(function(err, it) {
    if (err) throw err;
    console.log("itineary populated!");
    res.json(it._id)
  });
});

module.exports = router;

