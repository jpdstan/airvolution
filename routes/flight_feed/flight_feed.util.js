function distBW(photo, airport, unit) {
  var photolat =  Math.PI * photo.lat/180
  var photolon = photo.lon
  var airlat = Math.PI * airport.lat/180
  var airlon = airport.lon
  var theta = photolon-airlon
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(photolat) * Math.sin(airlat) + Math.cos(photolat) * Math.cos(airlat) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit == "K") { dist = dist * 1.609344 }
  if (unit == "N") { dist = dist * 0.8684 }
  return dist
}

//returns an object with the airport code and the distance
function getCode(photo, airports) {
  return Object.keys(airports)
    .map(airportCode => {
      var data = {
        airportCode: airportCode,
        distance: distBW(photo, airports[airportCode], 'K'),
        name: airports[airportCode].station_name
      };
      return data;
    })
    .reduce((min, curr)=> (curr.distance < min.distance) ? curr: min, {distance: Infinity})
}

//returns null if > 200 km or the airport code otherwise
var getNearestAirport = function(coords, airports) {
  var closest = getCode(coords, airports)
  if (closest.distance > 200) {
    return null;
  }
  else {
    var airport_data = {};
    airport_data[closest.airportCode]['name'] = closest.name;
    airport_data[closest.airportCode]['referer_photo'] = photo.images.standard_resolution;
    return closest;
  }
}

module.exports.getNearestAirport = getNearestAirport;
