/**
 * Created by leh on 02.12.2014.
 */
/**
 * Created by leh on 03.02.14.
 */
(function () {
    'use strict';


    // new Schema({ createdAt: { type: Date, expires: 60*60*24 }});

    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var crypto = require('crypto');

    /**
     * Login Info Schema
     */
    var LoginInfoSchema = new Schema({
        provider: 'string',
        providerKey: 'string'
    });

    /**
     * User schema
     */
    var UserSchema = new Schema({
        userName: {
            type: String,
            unique: true
        },
        email: String,
        passwordHash: String,
        salt: String,
        access_token: String,
        logins: [LoginInfoSchema]
    });

    /**
     * Virtuals
     */
    UserSchema.virtual('password').set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.passwordHash = this.encryptPassword(password);
    }).get(function() {
        return this._password;
    });

    /**
     * Validations
     */
    LoginInfoSchema.path('provider').validate(function(provider) {
        return (typeof provider === 'string' && provider.length > 0);
    }, 'Provider cannot be blank');

    LoginInfoSchema.path('providerKey').validate(function(providerKey) {
        return (typeof providerKey === 'string' && providerKey.length > 0);
    }, 'Provider key cannot be blank');

    UserSchema.path('email').validate(function(email) {
        return (typeof email === 'string' && email.length > 0);
    }, 'Email cannot be blank');

    UserSchema.path('userName').validate(function(userName) {
        return (typeof userName === 'string' && userName.length > 0);
    }, 'Username cannot be blank');

    UserSchema.path('passwordHash').validate(function(passwordHash) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (this.logins.length > 0) return true;
        return (typeof passwordHash === 'string' && passwordHash.length > 0);
    }, 'Password cannot be blank');

    /**
     * Pre-save hook
     */
    var validatePresenceOf = function(value) {
        return value && value.length;
    };

    /**
     * Methods
     */
    UserSchema.methods = {
        /**
         * Authenticate - check if the passwords are the same
         *
         * @param {String} plainText
         * @return {Boolean}
         * @api public
         */
        authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.passwordHash;
        },

        /**
         * Make salt
         *
         * @return {String}
         * @api public
         */
        makeSalt: function() {
            return crypto.randomBytes(16).toString('base64');
        },

        /**
         * Encrypt password
         *
         * @param {String} password
         * @return {String}
         * @api public
         */
        encryptPassword: function(password) {
            if (!password || !this.salt) return '';
            var salt = new Buffer(this.salt, 'base64');
            return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
        }
    };

    mongoose.model('User', UserSchema);
})();