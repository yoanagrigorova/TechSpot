angular.module('adminApp', ['ngAnimate'])

    .controller('adminCtrl', function ($scope, $http,$timeout) {
        $scope.editMode = false;
        

        $scope.editProduct = function (p) {
            $scope.editMode = true;
            $scope.productToEdit = p;

            $scope.saveProduct = function () {
                console.log($scope.productToEdit);
                $http.post('/admin' + '/' + p.type + '/' + p._id, angular.toJson($scope.productToEdit)).then(function (response) {
                    $scope.responseMsg = response.data.message;
                    $timeout(function(){
                        $scope.responseMsg = null;
                    }, 2000);
                });
            };

            $scope.deleteProduct = function() {
                $http.delete('/admin' + '/' + p.type + '/' + p._id, angular.toJson($scope.productToEdit)).then(function(response){
                    $scope.responseMsg = response.data.message;
                    $timeout(function(){
                        $scope.responseMsg = false;
                    }, 2000);
                })
            };

            $scope.deleteComment = function(com) {
                var index = $scope.productToEdit.comments.find(x => x.date == com.date);
                console.log(index);
                $scope.productToEdit.comments.splice(index,1);
                console.log($scope.productToEdit);
                $http.post('/admin' + '/' + p.type + '/' + p._id, angular.toJson($scope.productToEdit)).then(function (response) {
                    console.log(response);
                });
            };

            $scope.addNewProduct = function() {
                $scope.productToEdit = {};
            }
        
        }
    })