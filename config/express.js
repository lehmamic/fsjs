/**
 * Created by leh on 03.12.2014.
 */
(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var config = require('./config');

    module.exports = function(app) {
        // view engine setup
        app.set('views', path.join(config.root, 'app/views'));
        app.set('view engine', 'ejs');

        // uncomment after placing your favicon in /public
        //app.use(favicon(config.root, + '/public/favicon.ico'));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(config.root, 'public')));
    };
})();