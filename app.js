var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');

var config = require('./config/config');
var bootstrap = require('./app/bootstrap');

var routes = require('./app/routes/index');
var users = require('./app/routes/users');

// Bootstrap db connection
var db = mongoose.connect(config.db);

var models_path = path.join(config.root, '/app/models');
bootstrap.walkModels(models_path)
bootstrap.seed();

// Bootstrap express config
var app = express();
require('./config/express')(app);


// Bootstrap passport config
require('./config/passport')(app, passport);

//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.error(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
