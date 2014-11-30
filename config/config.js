/**
 * Created by lehmamic on 29/11/14.
 */
(function () {
    'use strict';

    // Utilize Lo-Dash utility library
    var _ = require('lodash');

    var env = process.env.NODE_ENV || 'development';

    // Extend the base configuration in all.js with environment
    // specific configuration
    module.exports = _.extend(
        require(__dirname + '/../config/env/all.js'),
        require(__dirname + '/../config/env/' + env + '.js') || {}
    );

})();