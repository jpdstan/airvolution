var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/user');
var get_flights = require('./routes/getflight');
var flights = require('./routes/flight_feed/flight_feed');
var itinerary = require('./routes/itinerary');
var get_closest_airport = require('./routes/get_closest_airport');

var env_json = require('./env.json');

var app = express();

var env = process.env.NODE_ENV || 'staging';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'staging';

// Set backend API endpoint
switch (env) {
    case "staging":
        app.locals.HOST = env_json["staging"]["url"];
        break;
    case "production":
        app.locals.HOST = env_json["production"]["url"];
        break;
}

// Set Airvolution and Instagram API
app.locals.AIR_URL = env_json["airvolution_api"]["url"];
app.locals.AIR_API_KEY = env_json["airvolution_api"]["api_key"];
app.locals.INSTA_ID = env_json["instagram"]["client_id"];
app.locals.INSTA_SECRET = env_json["instagram"]["client_secret"];

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// For testing client
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET POST PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.use('/', routes);
app.use('/users', users);
app.use('/get_flights', get_flights);
app.use('/flight_feed', flights);
app.use('/itinerary', itinerary);
app.use('/get_closest_airport', get_closest_airport);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers


// development error handler
// will print stacktrace

if (app.get('env') === 'staging') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});


module.exports = app;
