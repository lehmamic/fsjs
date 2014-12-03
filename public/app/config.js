/**
 * Created by leh on 02.12.2014.
 */
(function () {
    'use strict';

    angular.module('fullStackJS').config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/login', {
                    templateUrl: 'app/authentication/login/login.html',
                    controller: 'LoginCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
})();