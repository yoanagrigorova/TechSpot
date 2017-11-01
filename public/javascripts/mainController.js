angular.module("MainCtrl", [])
    .controller("MainController", function($scope, $http, $timeout, $location) {
        $scope.userInSess = {};
        $scope.errorMsg = false;
        $scope.addTOBasket = function(user) {
            console.log(user);
            $http.post("/login", JSON.stringify(user)).then(function(response) {

                if (response.data.success){
                    $scope.successMsg = response.data.message;
                    $scope.userInSess = response.data.user;
                    console.log($scope.userInSess);
                    $timeout(function(){
                        $location.path('/');
                    },2000)
                } else {
                    $scope.errorMsg = response.data.message;
                }

            })

        }
    })