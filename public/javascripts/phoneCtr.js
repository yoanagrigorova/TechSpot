// var app = angular.module("myApp", []);

app.controller("phonesCtrl", function($scope, $http) {
    $scope.pageTitle = "Мобилни телефони";
    $http.get("/phones").then(function(response) {
        console.log(response.data);
        $scope.phones = response.data;
    });
});