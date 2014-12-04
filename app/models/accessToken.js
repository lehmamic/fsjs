/**
 * Created by leh on 04.12.2014.
 */
(function () {
    'use strict';
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var config = require('../../config/config');

    /**
     * Login Info Schema
     */
    var AccessTokenSchema = new Schema({
        token: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
        expiresOn: Date,
        createdAt: { type: Date, expires: config.bearerTokenLifeTime.totalSeconds() }
    });

    mongoose.model('AccessToken', AccessTokenSchema);
})();