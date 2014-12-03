/**
 * Created by leh on 02.12.2014.
 */
(function () {
    'use strict';

    angular.module('fullStackJS.authentication', ['fullStackJS.oauth'])
        .config(["oauthProvider", function(oauthProvider) {
            oauthProvider.useTokenEndpoint('/token');
    }]);
})();