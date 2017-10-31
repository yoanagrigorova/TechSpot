angular.module("washingMachinesInfoController", [])
    .controller("washingMachinesInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(17);
        $http.get(url).then(function(response) {
            $scope.washingMachines = response.data;
        })
    })