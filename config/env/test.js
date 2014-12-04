/**
 * Created by lehmamic on 29/11/14.
 */
(function () {
    'use strict';

    var TimeSpan = require('timespan').TimeSpan;

    module.exports = {
        db: "mongodb://localhost/gallery_test",
        bearerTokenLength: 256,
        bearerTokenLifeTime: new TimeSpan(0, 0, 0, 24, 0)
        //facebook: {
        //    clientID: "APP_ID",
        //    clientSecret: "APP_SECRET",
        //    callbackURL: "http://localhost:3000/auth/facebook/callback"
        //},
        //twitter: {
        //    clientID: "CONSUMER_KEY",
        //    clientSecret: "CONSUMER_SECRET",
        //    callbackURL: "http://localhost:3000/auth/twitter/callback"
        //},
        //github: {
        //    clientID: "APP_ID",
        //    clientSecret: "APP_SECRET",
        //    callbackURL: "http://localhost:3000/auth/github/callback"
        //},
        //google: {
        //    clientID: "APP_ID",
        //    clientSecret: "APP_SECRET",
        //    callbackURL: "http://localhost:3000/auth/google/callback"
        //}
    };
})();