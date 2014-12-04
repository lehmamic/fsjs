/**
 * Created by leh on 04.12.2014.
 */
(function(){
    'use strict';

    /**
     * Return a unique identifier with the given `length`.
     *
     *     utils.uid(10);
     *     // => "FDaS435D2z"
     *
     * @param {Number} length
     * @return {String}
     * @api private
     */
    exports.uid = function(length) {
        var buf = [];
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; ++i) {
            buf.push(chars[getRandomInt(0, chars.length - 1)]);
        }

        return buf.join('');
    };

    /**
     * Return a random int, used by `utils.uid()`
     *
     * @param {Number} min
     * @param {Number} max
     * @return {Number}
     * @api private
     */

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})();