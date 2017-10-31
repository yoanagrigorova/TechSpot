angular.module("fridgesInfoController", [])
    .controller("fridgesInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(17);
        $http.get(url).then(function(response) {
            $scope.fridges = response.data;
        })
    })