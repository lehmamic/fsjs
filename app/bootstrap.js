/**
 * Created by lehmamic on 30/11/14.
 */
(function () {
    'use strict';

    var fs = require('fs');

    var walkModels = function(path) {
        fs.readdirSync(path).forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js$|coffee$)/.test(file)) {
                    require(newPath);
                }
            } else if (stat.isDirectory()) {
                walkModels(newPath);
            }
        });
    };
    exports.walkModels = walkModels;

    var walkRoutes = function(path, passport) {
        fs.readdirSync(path).forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile()) {
                // azure seems to have a file app/routes/users.js which causes problems here => filter out this file
                if (/(.*)\.(js$|coffee$)/.test(file) && file !== 'users.js') {
                    var route = require(newPath)(app, passport);
                }
                // We skip the app/routes/middlewares directory as it is meant to be
                // used and shared by routes as further middlewares and is not a
                // route by itself
            } else if (stat.isDirectory() && file !== 'middlewares') {
                walkRoutes(newPath);
            }
        });
    };
    exports.walkRoutes = walkRoutes;

})();