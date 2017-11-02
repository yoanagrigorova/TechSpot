angular.module("MainCtrl", ['ngCookies'])
    .controller("MainController", function($scope, $http, $timeout, $location, $rootScope, $cookies) {

        $scope.errorMsg = false;
        $scope.getCurrentUser = function() {
            $rootScope.userInSess = JSON.parse(localStorage.getItem('currentUser'));
        }
        $scope.logIn = function(user) {
            $http.post("/login", JSON.stringify(user)).then(function(response) {

                if (response.data.success) {
                    $scope.successMsg = response.data.message;
                    $rootScope.userInSess = response.data.user[0];
                    localStorage.setItem('currentUser', JSON.stringify(response.data.user[0]));
                    $timeout(function() {
                        $location.path('/');
                    }, 2000)
                } else {
                    $scope.errorMsg = response.data.message;
                }

            });

        }

        $scope.getCurrentUser();

        $scope.addToBasket = function(item) {
            $scope.getCurrentUser();
            if (!$rootScope.userInSess.products.some(x => x.title == item.title)) {
                $rootScope.userInSess.products.push(item);
            } else {
                var product = $rootScope.userInSess.products.find(x => x.title == item.title);
                product.quantity++;
            }
            localStorage.setItem('currentUser', JSON.stringify($rootScope.userInSess));
        }

        $scope.removeFromBasket = function(item) {
            $scope.getCurrentUser();

        }

        $scope.addToFavorites = function(item) {
            $scope.getCurrentUser();
            if (!$rootScope.userInSess.favorites.some(x => x.title == item.title)) {
                $rootScope.userInSess.favorites.push(item);
            } else {
                var product = $rootScope.userInSess.favorites.find(x => x.title == item.title);
                product.quantity++;
            }
            localStorage.setItem('currentUser', JSON.stringify($rootScope.userInSess));
        }
    })