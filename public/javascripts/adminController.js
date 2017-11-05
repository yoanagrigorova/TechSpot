angular.module('adminApp', ['ngAnimate'])

    .controller('adminCtrl', function ($scope, $http) {
        $scope.editMode = false;
        

        $scope.editProduct = function (p) {
            $scope.editMode = true;
            $scope.productToEdit = p;

            $scope.saveProduct = function () {
                console.log($scope.productToEdit);
                $http.post('/admin' + '/' + p.type + '/' + p._id, angular.toJson($scope.productToEdit)).then(function (response) {
                    console.log(response);
                });
            };

            $scope.deleteProduct = function() {
                $http.delete('/admin' + '/' + p.type + '/' + p._id, angular.toJson($scope.productToEdit)).then(function(response){
                    console.log(response)
                })
            };
        
        }
    })