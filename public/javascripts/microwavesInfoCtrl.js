angular.module("microwavesInfoController", [])
    .controller("microwavesInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(18);
        $http.get(url).then(function(response) {
            $scope.microwaves = response.data;
        })
    })