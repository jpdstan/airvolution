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

// Schema for each saved Itineary page
var userSchema = new Schema({
    url: String,
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
mongoose.model("Itinerary", itnerary);



// Returning
router.get('/find/:id', function (req, res, next) {
    //TODO FIND itenerary with ID

    res.send('USER')
} )

//POPULATE using BODY (PAYLOAD)
router.post('/', function (req, res) {
  var secret = req.body.secret;
  res.end('Password: ' + secret);
});

module.exports = router;

