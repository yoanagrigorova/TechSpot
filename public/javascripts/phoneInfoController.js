angular.module("phoneInfoController", [])
    .controller("phoneInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(2);
        $http.get(url).then(function(response) {
            $scope.phones = response.data;
        })
    })