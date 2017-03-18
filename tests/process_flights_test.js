var available = require("../examples/GetAvailability.json");

// Processes flights data from GetAvailability and converts it into usable data for get_flights endpoint.
var process_flights = function(availablity_data, list_size){
    // Sort flights in FlightSearch by cheapest flight
    var cheapest_flights = availablity_data["data"]["FlightSearch"].sort(function(a, b) {
        price_a = a["TotalJourneyAmount"]["FareType"][0]["ADT"]["FinalFare"];
        price_b = b["TotalJourneyAmount"]["FareType"][0]["ADT"]["FinalFare"];

        if (price_a < price_b) {
            return -1;
        } else if (price_a > price_b) {
            return 1;
        } else {
            return 0;
        }
    });
    // Only want up to LIST_SIZE flights to be reccomended to user.
    cheapest_flights = cheapest_flights[0].slice(0, list_size);
    // Populate new JSON object to return for get_flights endpoint.
    var flights = cheapest_flights.map(function(obj) {
        var segment = obj["Segment"][0];

        return {
            carrier_code: segment.CarrierCode,
            flight_number: segment.FlightNumber,
            STA_UTC: segment.STA_UTC,
            STD_UTC: segment.STD_UTC,
            estimated_time: segment.EstimatedTime,
            final_fare: obj.TotalJourneyAmount.FareType[0].ADT.FinalFare,
            currency_code: obj.TotalJourneyAmount.FareType[0].ADT.CurrencyCode,
        }
    });
    var processed_flights = {};
    processed_flights["flights"] = flights;
    return processed_flights;
};

var processed = process_flights(available, 3);
console.log(processed);