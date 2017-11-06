angular.module("homeController", ["ui.bootstrap"])
    .controller("homeCtrl", function($scope, $http) {
        $http.get("/api/phones").then(function(response) {
            $scope.phones = response.data;
        })
    })