angular.module("MainCtrl", [])
    .controller("MainController", function($scope, $http, $timeout, $location, $rootScope) {
        $rootScope.login = false;
        $rootScope.userInSess = {};
        $scope.errorMsg = false;
        $scope.logIn = function(user) {
            console.log(user);
            $http.post("/login", JSON.stringify(user)).then(function(response) {
                if (response.data.success) {
                    $scope.successMsg = response.data.message;
                    $rootScope.userInSess = response.data.user;
                    $rootScope.login = true;
                    console.log($scope.userInSess);
                    $timeout(function() {
                        $location.path('/');
                    }, 2000)
                } else {
                    $scope.errorMsg = response.data.message;
                }

            })

        }

        $scope.message = "Hello"

        $scope.addToBasket = function(item) {
            console.log(item);
            console.log($rootScope.userInSess);
            $rootScope.userInSess.products.push(item);
            console.log($rootScope.userInSess);
        }

        $scope.logout = function() {
            $http.get("/api/logout").then(function(response) {
                $rootScope.login = false;
                $location.path('/');
            })
        }


    })