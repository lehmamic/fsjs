/**
 * Created by lehmamic on 09/12/14.
 */
(function () {
    'use strict';

    angular.module('fullStackJS.oauth')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpAuthHeaderInterceptor');
        }]);
})();