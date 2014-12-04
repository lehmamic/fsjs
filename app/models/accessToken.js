/**
 * Created by leh on 04.12.2014.
 */
(function () {
    'use strict';
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    /**
     * Login Info Schema
     */
    var AccessTokenSchema = new Schema({
        token: 'string',
        expiresOn: 'string',
        createdAt: { type: Date, expires: 60*60*24 }
    });
})();