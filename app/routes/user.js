/**
 * Created by lehmamic on 06/12/14.
 */
(function () {
    'use strict';

    var user = require('../controllers/user');

    module.exports = function(app, passport) {
        app.get('/api/users',
            passport.authenticate('bearer', { session: false }),
            user.getAll);
    };

})();