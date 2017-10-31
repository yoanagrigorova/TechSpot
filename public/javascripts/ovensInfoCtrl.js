angular.module("ovensInfoController", [])
    .controller("ovensInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(17);
        $http.get(url).then(function(response) {
            $scope.ovens = response.data;
        })
    })