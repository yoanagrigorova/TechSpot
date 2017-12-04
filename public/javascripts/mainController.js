angular.module("MainCtrl", ['ngCookies', 'ngAnimate'])
    .controller("MainController",['$scope', '$http', '$timeout', '$location', '$rootScope', '$route', '$window', function($scope, $http, $timeout, $location, $rootScope, $route, $window) {
    var sha1 = require('sha1');
        // $rootScope.login = false;
        $scope.userRegister = {};
        $scope.errorMsg = false;
        $scope.notLoggedIn = false;

        $scope.checkSession = function() {
            $http.get('/sessioncheck').then(function(response) {

            }).catch(function(res) {
                if ($location.path() != '/login') {
                    $rootScope.sessionTimeout = 'Сесията ви е изтекла, моля влезте отново в профила си !'
                    $timeout(function() {
                        $rootScope.sessionTimeout = false;
                        $location.path('/login');
                        $scope.logOut();
                    }, 2500);
                }
            })
        };
        $scope.checkSession();

        $scope.getCurrentUser = function() {
            $rootScope.userInSess = JSON.parse(localStorage.getItem('currentUser'));
            $scope.userInfo = [$rootScope.userInSess];
        }
        $scope.logIn = function(user) {
            user.password = sha1(user.password);
            $http.post("/login", JSON.stringify(user)).then(function(response) {

                if (response.data.success) {
                    $scope.successMsg = response.data.message;
                    $rootScope.userInSess = response.data.user[0];
                    $rootScope.login = true;
                    $rootScope.users = [$rootScope.userInSess];
                    localStorage.setItem('currentUser', JSON.stringify(response.data.user[0]));
                    $timeout(function() {
                        $location.path('/');
                    }, 2000);

                    $timeout(function() {
                        localStorage.clear();
                    }, 600000);
                } else {
                    $scope.errorMsg = response.data.message;
                    $timeout(function() {
                        $scope.errorMsg = null;
                    }, 2000);
                }
            });

        }

        $scope.register = function(user) {
            console.log($scope.userRegister)
            console.log(user);
            $http.post("/api/registration", JSON.stringify(user)).then(function(response) {
                console.log(response.data);
                if (response.data.success) {
                    $scope.successRegMsg = response.data.message;
                    $timeout(function() {
                        $location.path('/');
                    }, 2000);
                } else {
                    $scope.errorRegMsg = response.data.message;
                }

            });
        }

        $scope.logOut = function() {
            $rootScope.userInSess = {};
            var user = localStorage.getItem('currentUser');

            $http.post('/api/logout', user).then(function(response) {
                console.log()
            });
            localStorage.clear();

            $rootScope.login = false;

        }
        $scope.getCurrentUser();

        if ($rootScope.userInSess) {
            $rootScope.login = true;
        }

        $scope.newComment = {};
        $scope.addCommentToProduct = function(product) {
            $scope.date = new Date().toLocaleString('en-GB');
            product.comments.push({ user: $rootScope.userInSess.mail, date: $scope.date, text: $scope.newComment.text });
            $scope.newComment.text = '';
            $http.post('/admin' + '/' + product.type + '/' + product._id, angular.toJson(product)).then(function(response) {
                console.log(response);
            });
        }


        $scope.addToCart = function(item) {
            $scope.getCurrentUser();
            if ($rootScope.userInSess) {
                if (!$rootScope.userInSess.products.some(x => x.title == item.title)) {
                    $rootScope.userInSess.products.push(item);
                } else {
                    var product = $rootScope.userInSess.products.find(x => x.title == item.title);
                    product.quantity++;
                }
                localStorage.setItem('currentUser', angular.toJson($rootScope.userInSess));
                console.log($rootScope.userInSess);

                $scope.addProduct = true;
                $timeout(function() {
                    $scope.addProduct = false;

                }, 2000);


            } else {
                $scope.notLoggedIn = true;
                $timeout(function() {
                    $scope.notLoggedIn = false;

                }, 2000)
            }
        }

        $scope.removeFromCart = function(item) {
            $scope.getCurrentUser();
            var index = $rootScope.userInSess.products.findIndex(x => x.title == item.title);
            $rootScope.userInSess.products.splice(index, 1);
            localStorage.setItem('currentUser', angular.toJson($rootScope.userInSess));
        }

        $scope.addToFavorites = function(item) {
            $scope.getCurrentUser();
            if (!$rootScope.userInSess.favorites.some(x => x.title == item.title)) {
                $rootScope.userInSess.favorites.push(item);
            } else {
                var product = $rootScope.userInSess.favorites.find(x => x.title == item.title);
                product.quantity++;
            }
            localStorage.setItem('currentUser', angular.toJson($rootScope.userInSess));

            $scope.addProductToFavorites = true;
            $timeout(function() {
                $scope.addProductToFavorites = false;
            }, 2000);
        }

        $scope.removeFromFavorite = function(item) {
            $scope.getCurrentUser();
            var index = $rootScope.userInSess.favorites.findIndex(x => x.title == item.title);
            $rootScope.userInSess.favorites.splice(index, 1);
            localStorage.setItem('currentUser', angular.toJson($rootScope.userInSess));
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

        $scope.getTotal = function() {
            var total = 0;
            $rootScope.userInSess.products.forEach(function(pr) {
                total += (pr.price * pr.quantity)
            });
            localStorage.setItem("totalPrice", angular.toJson(total));
            return localStorage.getItem("totalPrice");;
        }

        $scope.finalPurchase = function(items) {
            $scope.final = true;

            items.forEach(it => $rootScope.userInSess.boughtProducts.push(it));
            localStorage.setItem('currentUser', angular.toJson($rootScope.userInSess));
            items.forEach(it => $scope.removeFromCart(it));
        }


        $scope.getInfo = function() {
            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me', { fields: 'first_name, last_name, email' }, function(response) {
                        console.log($scope.userRegister);
                        $scope.userRegister.name = response.first_name;
                        $scope.userRegister.lastName = response.last_name;
                        $scope.userRegister.email = response.email;
                    })
                } else {
                    console.log('Not authorized!')
                }

            })
        };


    }]);

    
