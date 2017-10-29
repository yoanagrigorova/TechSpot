angular.module("computersInfoController", [])
    .controller("computersInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(2);
        $http.get(url).then(function(response) {
            $scope.computers = response.data;
        })
    })