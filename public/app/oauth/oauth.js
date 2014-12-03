/**
 * Created by leh on 03.12.2014.
 */
(function () {
    'use strict';

    angular.module('fullStackJS.oauth').provider('oauth', function OAuthProvider() {
        var tokenEndpoint = "";

        this.useTokenEndpoint = function(uri) {
            tokenEndpoint = uri;
        };

        this.$get = ["$http", "$q", function OAuthFactory($http, $q) {
            return new OAuth($http, $q, tokenEndpoint);
        }];
    });

    function OAuth($http, $q, tokenEndpoint) {
        this.$http = $http;
        this.$q = $q;
        this.tokenEndpoint = tokenEndpoint;

        this.authenticate = function(username, password) {
            if (this.tokenEndpoint !== 'string' && this.tokenEndpoint.length <= 0)
            {
               throw 'No token endpoint configured.';
            }

            var deferred = $q.defer();

            var httpConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': '*/*'
                }
            };

            var xsrf = $.param({ username: username, password: password, grant_type: "password" });

            this.$http.post(this.tokenEndpoint, xsrf, httpConfig)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };
    }
})();