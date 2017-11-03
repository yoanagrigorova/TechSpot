angular.module('adminApp', [])

.controller('adminCtrl', function($scope, $http) {

    $scope.product = {};

    $scope.editProduct = function(p) {
        $scope.editMode = true;
        console.log(p.title);
        $scope.product.ime = p.title;
        $scope.product.price = p.price;

        $scope.changeName = function() {
            p.title = $scope.product.ime;
        }

        $scope.changePrice = function() {
            console.log(p._id);
            p.price = parseInt($scope.product.price);
            console.log(p.price);
        }

        // $scope.propFields = function() {
        //     $scope.options = [];
        //     for (prop in p) {
        //         console.log(prop)
        //         $scope.options.push(prop);
        //     }
        //     console.log($scope.options);
        // }

        // $scope.propFields();

        $scope.saveProduct = function() {
            console.log(p);
            $http.post('/admin' + '/' + p.type + '/' + p._id, angular.toJson(p)).then(function(response) {
                console.log(response);
            });
        }
    }




})