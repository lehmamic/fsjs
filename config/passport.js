/**
 * Created by leh on 03.12.2014.
 */
(function () {
    'use strict';

    var mongoose = require('mongoose');
    var User = mongoose.model('User');
    var AccessToken = mongoose.model('AccessToken');
    var LocalStrategy = require('passport-local').Strategy;
    var BearerStrategy = require('passport-http-bearer').Strategy;
    var config = require('./config');
    var utils = require('../shared/utils');

    module.exports = function(app, passport) {

        // Use the LocalStrategy within Passport.
        //   Strategies in passport require a `verify` function, which accept
        //   credentials (in this case, a username and password), and invoke a callback
        //   with a user object.  In the real world, this would query a database;
        //   however, in this example we are using a baked-in set of users.
        passport.use(new LocalStrategy(function(username, password, done) {
            User.findOne({ userName: username }, function(err, user) {
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

        // Use the BearerStrategy within Passport.
        //   Strategies in Passport require a `validate` function, which accept
        //   credentials (in this case, a token), and invoke a callback with a user
        //   object.
        passport.use(
            new BearerStrategy(function(token, done) {
                AccessToken.findOne({ token: token })
                .populate('_creator')
                .exec(function (err, doc) {
                        if(err) {
                            return done(err)
                        }
                        if(!doc || !doc.user || !doc.user._id) {
                            return done(null, false)
                        }

                        return done(null, doc.user, { scope: 'all' })
                    });
                }
            )
        );

        // Token endpoint to retrieve a self issued access token.
        app.post('/token',
            passport.authenticate(['local'], { session: false }),
            function(req, res) {

                AccessToken.findOrCreate({ user: req.user._id }, function (err, result) {

                    if(result) {
                        var responseData = {
                            token_type: 'Bearer',
                            access_token: result.token,
                            expires_in: result.expiresIn,
                            user_name: req.user.userName
                        };

                        res.send(responseData);
                    } else {
                        res.send(500);
                    }

                });
             });
    };
})();