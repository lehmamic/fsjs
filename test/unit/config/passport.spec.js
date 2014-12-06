/**
 * Created by lehmamic on 05/12/14.
 */
(function () {
    'use strict';

    var expect = require('expectations');
    var request = require('supertest');
    var express = require('express');
    var mongoose = require('mongoose');
    var mockgoose = require('mockgoose');
    var passport = require('passport');
    var bootstrap = require('../../../app/bootstrap')

    mockgoose(mongoose);

    var app = express();
    require('../../../app/models/user');
    require('../../../app/models/accessToken');
    require('../../../config/express')(app);
    require('../../../config/passport')(app, passport)

    describe("passport config", function() {

        describe("POST /token", function() {
            beforeEach(function(){
                mockgoose.reset()
                bootstrap.seed();
            });

            it("with valid user login returns a token", function(done) {

                request(app)
                    .post('/token')
                    .send({ username: 'Admin', password: '12345', grant_type: "password"})
                    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
                    .expect(200)
                    .expect(function(err, res){
                        expect(res.body.user_name).toEqual('Admin');
                    })
                    .end(function() { done (); });

            });

            it("with invalid user login returns http 401", function(done) {

                request(app)
                    .post('/token')
                    .send({ username: 'Admin', password: '12345a', grant_type: "password"})
                    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
                    .expect(401)
                    .end(function() { done (); });

            });

            it("called twice returns same token", function(done) {

                var access_token;

                request(app)
                    .post('/token')
                    .send({ username: 'Admin', password: '12345', grant_type: "password"})
                    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
                    .expect(200)
                    .end(function(err, res) { access_token = res.body.access_token; });

                request(app)
                    .post('/token')
                    .send({ username: 'Admin', password: '12345', grant_type: "password"})
                    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
                    .expect(200)
                    .expect(function(err, res){
                        expect(res.body.access_token).toEqual(access_token);
                    })
                    .end(function() { done (); });

            });
        });
    });
})();