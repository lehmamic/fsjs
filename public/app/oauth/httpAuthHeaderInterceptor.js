/**
 * Created by lehmamic on 09/12/14.
 */
(function () {
    'use strict';

    angular.module('fullStackJS.oauth').provider('httpAuthHeaderInterceptor', function HttpAuthHeaderInterceptorProvider() {
        this.authorizationSchema = "Bearer";
        this.authHeaderFn;
        var self = this;

        this.useAuthorizationHeader = function(headerFn, schema) {
            self.authorizationSchema = schema || "Bearer";
            self.authHeaderFn = headerFn;
        };

        this.$get = ["$http", "$q", function HttpAuthTokenInterceptorFactory($q, authTokenCache) {
            return {
                request: function (config) {

                    if(self.authHeaderFn) {
                        var token = self.authHeaderFn();

                        if (token) {
                            config.headers["Authorization"] = self.authorizationSchema + " " + token;
                        }
                    }

                    return config || $q.when(config);
                }
            };
        }];
    });

})();