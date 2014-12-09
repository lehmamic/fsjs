/**
 * Created by lehmamic on 09/12/14.
 */
(function () {
    'use strict';

    angular.module('fullStackJS.oauth').factory('authTokenCache', [TokenCacheFactory]);

    function TokenCacheFactory() {
        var accessTokenKey = "authToken";

        var service = {
            get: getAccessToken,
            set: setAccessToken,
            clear: clearAccessToken
        };

        return service;

        function clearAccessToken() {
            localStorage.removeItem(accessTokenKey);
            sessionStorage.removeItem(accessTokenKey);
        };

        function setAccessToken(accessToken, persistent) {
            if (persistent) {
                localStorage[accessTokenKey] = accessToken;
            } else {
                sessionStorage[accessTokenKey] = accessToken;
            }
        };

        function getAccessToken() {
            return sessionStorage[accessTokenKey] || localStorage[accessTokenKey];
        };
    }

})();