angular.module("vacuumInfoController", [])
    .controller("vocuumsInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(18);
        $http.get(url).then(function(response) {
            $scope.vacuums = response.data;
        })
    })