/**
 * Created by leh on 04.12.2014.
 */
(function () {
    'use strict';
    var moment = require('moment');
    var timespan = require('timespan');
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var config = require('../../config/config');
    var utils = require('../../shared/utils');

    /**
     * Login Info Schema
     */
    var AccessTokenSchema = new Schema({
        token: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
        expiresOn: Date,
        createdAt: { type: Date, expires: config.bearerTokenLifeTime.totalSeconds() }
    });

    AccessTokenSchema.pre('save', function (next) {

        var now = moment();

        this.token = utils.uid(config.bearerTokenLength);
        this.createdAt = now.clone().toDate()
        this.expiresOn = now.clone().add(config.bearerTokenLifeTime.totalSeconds(), 's').toDate();

        next();
    });

    AccessTokenSchema.statics.findOrCreate = function(filters, cb) {
        var AccessToken = this;
        this.find(filters, function(err, results) {
            if(results.length == 0) {
                var newToken= new AccessToken();
                newToken.user = filters.user;


                newToken.save(function(err, doc) {
                    cb(err, doc)
                });
            } else {
                cb(err, results[0]);
            }
        });
    };

    AccessTokenSchema.virtual('expiresIn').get(function () {
        var now = moment().toDate();
        var expiresOn = this.expiresOn;

        var expiresIn = timespan.fromDates(now, expiresOn);

        return Math.floor(expiresIn.totalSeconds());
    });

    mongoose.model('AccessToken', AccessTokenSchema);
})();