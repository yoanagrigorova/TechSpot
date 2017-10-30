angular.module("MainCtrl", [])
    .controller("MainController", function($scope, $http) {
        console.log(123);
        $scope.addTOBasket = function() {
            $http.post("/login").then(function(response) {
                console.log(response.data);

            })
        }
    })