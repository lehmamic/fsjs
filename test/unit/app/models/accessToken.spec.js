/**
 * Created by lehmamic on 06/12/14.
 */
(function () {
    'use strict';

    var mongoose = require('mongoose');
    var mockgoose = require('mockgoose');
    var moment = require('moment');
    var bootstrap = require('../../../../app/bootstrap')

    require('../../../../app/models/accessToken');
    var AccessToken = mongoose.model('AccessToken');

    require('../../../../app/models/user');
    var User = mongoose.model('User');

    mockgoose(mongoose);

    describe("AccessToken", function() {
        beforeEach(function(){
            mockgoose.reset()
            bootstrap.seed();
        });

        describe("save", function() {

            it("automatically populates token, createdAt and expiresOn", function(done) {
                // arrange
                var newToken= new AccessToken();

                // act
                newToken.save(function(err, doc) {
                    expect(doc.token).toBeDefined();
                    expect(doc.createdAt).toBeDefined();
                    expect(doc.expiresOn).toBeDefined();

                    done();
                });
            });

        });

        describe("expiresIn", function() {
            it("is calculated according to expiresOn", function() {
                // arrange
                var newToken= new AccessToken();
                newToken.expiresOn = moment().add(1, 'h').toDate();

                // act
                var actual = newToken.expiresIn;

                // assert
                expect(actual).toBeGreaterThan(0);
            });
        });

        describe("findOrCreate", function() {
            it("creates a token if the query does not find one", function(done) {
                User.findOne({ userName: 'Admin' }, function(err, doc) {

                    // act
                    AccessToken.findOrCreate( { user: doc._id }, function(err, doc){

                        // assert
                        expect(doc).toBeDefined();

                        done();
                    });
                });
            });

            it("returns existing token if the query finds one", function(done) {
                var access_token;
                var userId;

                User.findOne({ userName: 'Admin' }, function(err, doc) {
                    userId = doc._id;

                    AccessToken.findOrCreate( { user: userId }, function(err, doc){
                        access_token = doc.token;

                        // act
                        AccessToken.findOrCreate({ user: userId }, function(err, doc) {
                            // assert
                            expect(doc.token).toEqual(access_token);

                            done();
                        });
                    });
                });
            });
        });
    });
})();