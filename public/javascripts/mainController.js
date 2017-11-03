angular.module("MainCtrl", ['ngCookies', 'ngAnimate'])
    .controller("MainController", function($scope, $http, $timeout, $location, $rootScope) {

        // $rootScope.login = false;
        $scope.errorMsg = false;
        $scope.getCurrentUser = function() {
            $rootScope.userInSess = JSON.parse(localStorage.getItem('currentUser'));
            console.log($rootScope.userInSess);
        }
        $scope.logIn = function(user) {
            $http.post("/login", JSON.stringify(user)).then(function(response) {

                if (response.data.success) {
                    $scope.successMsg = response.data.message;
                    $rootScope.userInSess = response.data.user[0];
                    $rootScope.login = true;
                    $rootScope.users = response.data.user[0];
                    localStorage.setItem('currentUser', JSON.stringify(response.data.user[0]));
                    $timeout(function() {
                        $location.path('/');
                    }, 2000)
                } else {
                    $scope.errorMsg = response.data.message;
                }

            });

        }

        $scope.register = function(user) {
            console.log(user);
            $http.post("/api/registration", JSON.stringify(user)).then(function(response) {

                if (response.data.success) {
                    $scope.successMsg = response.data.message;
                    $location.path('/')
                } else {
                    $scope.errorMsg = response.data.message;
                }

            });

        }

        $scope.getCurrentUser();

        if ($rootScope.userInSess) {
            $rootScope.login = true;
        }


        $scope.addToCart = function(item) {
            $scope.getCurrentUser();
            if (!$rootScope.userInSess.products.some(x => x.title == item.title)) {
                $rootScope.userInSess.products.push(item);
            } else {
                var product = $rootScope.userInSess.products.find(x => x.title == item.title);
                product.quantity++;
            }
            localStorage.setItem('currentUser', JSON.stringify($rootScope.userInSess));
            $scope.addProduct = true;
            $timeout(function() {
                $scope.addProduct = false;
            }, 2000);
        }

        $scope.removeFromCart = function(item) {
            $scope.getCurrentUser();
            var index = $rootScope.userInSess.products.findIndex(x => x.title == item.title);
            $rootScope.userInSess.products.splice(index, 1);
            localStorage.setItem('currentUser', JSON.stringify($rootScope.userInSess));
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

        $scope.removeFromFavorite = function(item) {
            $scope.getCurrentUser();
            var index = $rootScope.userInSess.favorites.findIndex(x => x.title == item.title);
            $rootScope.userInSess.favorites.splice(index, 1);
            localStorage.setItem('currentUser', JSON.stringify($rootScope.userInSess));
        }

        var products = [];
        $scope.addToCompare = function(item) {
            $scope.compare = true;
            if (products.length <= 5 && products.find(pr => pr._id === item._id) === undefined) {
                products.push(item);
            }
            $scope.compareProducts = products;
        }

        $scope.removeCompare = function(item) {
            var index = products.findIndex(pr => pr._id == item._id);
            products.splice(index, 1);
            if (products.length == 0) {
                $scope.compare = false;
            }
        }

        $scope.showCategory = function(products, property) {
            return products.some(pr => pr.hasOwnProperty(property));
        }
    })