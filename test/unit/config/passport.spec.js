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

    require('../../../app/models/accessToken');
    var AccessToken = mongoose.model('AccessToken');

    require('../../../app/models/user');
    var User = mongoose.model('User');

    // test endpoint
    app.get('/test',
        passport.authenticate('bearer', { session: false }),
        function(req, res){
            res.send("authentication passed");
        });

    describe("passport config", function() {

        beforeEach(function(){
            mockgoose.reset()
            bootstrap.seed();
        });

        describe("POST /token", function() {

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

        describe("calling a protected api", function() {
            it("returns http 401 without authorization header", function(done) {
                request(app)
                    .get('/test')
                    .set('Authorization', 'Bearer asdf')
                    .expect(401)
                    .end(function() { done(); });
            });

            it("returns http 401 with invalid token", function(done) {
                request(app)
                    .get('/test')
                    .set('Authorization', 'Bearer asdf')
                    .expect(401)
                    .end(function() { done(); });
            });

            //it("executes api with valid token", function(done) {
            //    User.findOne({ userName: 'Admin' }, function(err, doc) {
            //        AccessToken.findOrCreate( { user: doc._id }, function(err, doc){
            //
            //            var authorizationHeader = 'Bearer ' + doc.token;
            //
            //            // act
            //            request(app)
            //                .get('/test')
            //                .set('authorization', authorizationHeader)
            //                .expect(200)
            //                .end(function() { done(); });
            //        });
            //    });
            //});
        });
    });
})();