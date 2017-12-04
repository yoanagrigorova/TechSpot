angular.module("profileController", [])
    .controller("profileCtrl", ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
        $scope.users = $rootScope.userInSess;
    }])