var available = require("../examples/GetAvailabilityActual.json");

// Processes flights data from GetAvailability and converts it into usable data for get_flights endpoint.
var process_flights_one_way = function(flight_data, list_size) {
    // Sort flights in FlightSearch by cheapest flight
    var cheapest_flights = flight_data.sort(function(a, b) {
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
    cheapest_flights = cheapest_flights.slice(0, list_size);
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
        };
    });
    return flights;
};

process_flights = function(availability_data, list_size) {
    var departing = availability_data["data"]["FlightSearch"][0];
    var returning = availability_data["data"]["FlightSearch"][1];

    var processed_departing = process_flights_one_way(departing, 3);
    var processed_return = process_flights_one_way(returning, 3);

    return {
        departing_flights: processed_departing,
        return_flights: processed_return
    };
}

var processed = process_flights(available, 3);
console.log(JSON.stringify(processed));