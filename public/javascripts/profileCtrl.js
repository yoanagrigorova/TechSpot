angular.module("profileController", [])
    .controller("profileCtrl", function($scope, $http, $rootScope) {
        $scope.users = $rootScope.userInSess;
    })