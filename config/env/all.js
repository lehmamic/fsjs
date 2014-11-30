/**
 * Created by lehmamic on 29/11/14.
 */
(function () {
    'use strict';

    var path = require('path');
    var rootPath = path.normalize(__dirname + '/../..');

    module.exports = {
        root: rootPath,
        port: process.env.PORT || 3000

        // The secret should be set to a non-guessable string that
        // is used to compute a session hash
        //sessionSecret: 'Rpg.net session seecret',
        // The name of the MongoDB collection to store sessions in
        //sessionCollection: 'sessions'
    };
})();