import json

with open('airports.json') as data_file:
    all_airports = json.load(data_file)

with open('ActiveAirports.json') as data_file:
    active_airports = json.load(data_file)


airasia_airports = {}
for airport in active_airports["stations"]:
    if airport in all_airports:
        airasia_airports[airport] = {}
        airasia_airports[airport]["lat"] = all_airports[airport]["lat"]
        airasia_airports[airport]["lon"] = all_airports[airport]["lon"]
        airasia_airports[airport]["name"] = active_airports["stations"][airport]["value"]

with open('AirAsiaAirports.json', 'w') as fp:
    json.dump(airasia_airports, fp)