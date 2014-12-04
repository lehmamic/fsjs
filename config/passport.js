/**
 * Created by leh on 03.12.2014.
 */
(function () {
    'use strict';

    var mongoose = require('mongoose');
    var User = mongoose.model('User');
    var LocalStrategy = require('passport-local').Strategy;
    var config = require('./config');
    var utils = require('../shared/utils');

    module.exports = function(app, passport) {

        // Use the LocalStrategy within Passport.
        //   Strategies in passport require a `verify` function, which accept
        //   credentials (in this case, a username and password), and invoke a callback
        //   with a user object.  In the real world, this would query a database;
        //   however, in this example we are using a baked-in set of users.
        passport.use(new LocalStrategy(function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { error_description: 'User not found.' });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { error_description: 'Invalid password.' });
                }

                return done(null, user);

            });
        }));

        app.post('/token',
            passport.authenticate(['local'], { session: false }),
            function(req, res) {

                var token = utils.uid(config.bearerTokenLength)
                var responseData = {
                    access_token: token,
                    user_name: 'asdf'
                };

                res.send(responseData);
            });
    };
})();