/**
 * Created by leh on 02.12.2014.
 */
(function () {
    'use strict';

    angular.module('fullStackJS.authentication').controller('LoginCtrl', ['$scope', 'oauth',
        function($scope, oauth) {
            $scope.loginData = {
                username: undefined,
                password: undefined
            };

            $scope.login = function() {
                oauth.authenticate($scope.loginData.username, $scope.loginData.password).then(
                        function (data) {
                            console.log("Successfully logged in.");
                        },
                        function (error) {
                            console.log("error happened.");
                        });
            };
    }]);
})();