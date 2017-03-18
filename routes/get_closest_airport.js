/**
 * Created by developer on 3/19/17.
 */
var express = require('express');
var router = express.Router();

var fs = require('fs');
var OBJ = JSON.parse(fs.readFileSync('airports.json', 'utf8'));


function distBW(photo, airport, unit) {
    var photolat =  Math.PI * photo.lat/180;
   // console.log("PHOTOLAT: " + photolat);
    var photolon = photo.lon;
    var airlat = Math.PI * airport.lat/180;
    var airlon = airport.lon;
    var theta = photolon-airlon;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(photolat) * Math.sin(airlat) + Math.cos(photolat) * Math.cos(airlat) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}
//returns an object with the airport code and the distance
function getCode(photo, airports){
    return Object.keys(airports)
            .map(airportCode => {
            var blah = {
                airportCode: airportCode,
                distance: distBW(photo, airports[airportCode], 'K')
            }
            return blah
        }).reduce((min, curr)=> (curr.distance < min.distance) ? curr: min, {distance: Infinity})
}

//returns null if >200 km or the airport code otherwise
function getNearestAirport(photo, airports){

    var closest = getCode(photo,airports);
    console.log("CLOSEST: " + JSON.stringify(closest));
    if (closest.distance >200){
        return null
    }

    else {
        return closest.airportCode
    }
}


/* GET closest airport. */
router.get('/', function(req, res) {
    var parsedJSON = OBJ;

    var user = {
        lon: req.query.longitude,
        lat: req.query.latitude
};
    console.log("YOYO" + JSON.stringify(user));
    var closest_airport_code = getNearestAirport(user, parsedJSON);

    //RETURN TO FRONT END: CLOSEST AIRPORT CODE
    res.json("ANSWER: "+closest_airport_code);
    res.send('respond with a resource'+closest_airport_code);
});

module.exports = router;
