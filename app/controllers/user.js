/**
 * Created by lehmamic on 06/12/14.
 */
(function () {
    'use strict';

    var mongoose = require('mongoose');
    var User = mongoose.model('User');

    exports.getAll= function(req, res) {
        User.find(function(err, results) {
            if(err) {
                res.send(500);
            }
            else {
                res.send(results);
            }
        });
    };
})();