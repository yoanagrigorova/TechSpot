angular.module("phoneController", [])

    .controller("phonesCtrl", function ($scope, $http) {
        console.log('test');
        $scope.search = {
        };
        $scope.pageTitle = "Мобилни телефони";
        $http.get("/phones").then(function (response) {
            $scope.phones = response.data;
        });
    });