angular.module("tvsInfoController", [])
    .controller("tvsInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(2);
        $http.get(url).then(function(response) {
            $scope.tvs = response.data;
        })
    })