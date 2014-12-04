/**
 * Created by leh on 03.12.2014.
 */
(function () {
    'use strict';

    var mongoose = require('mongoose');
    var User = mongoose.model('User');
    var LocalStrategy = require('passport-local').Strategy;
    var config = require('./config');
    var oauth2orize = require('oauth2orize');

    module.exports = function(app, passport) {

        var server = oauth2orize.createServer();

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
                    return done(null, false, { message: 'User not found.' });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid password.' });
                }

                return done(null, user);

            });
        }));

        app.post('/token',
            passport.authenticate(['local'], { session: false }),
            server.token(),
            server.errorHandler());
    };
})();