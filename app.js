var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/user');
<<<<<<< b8c6196d9224262828902b9e3143d64d5ddc1115
var get_flights = require('./routes/getflight');
=======
var flights = require('./routes/flight_feed');
>>>>>>> add flight feed, remove view engine and view rendering

var app = express();

var env = process.env.NODE_ENV || 'staging';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'staging';

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/get_flights', get_flights);
app.use('/flights', flights);

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
