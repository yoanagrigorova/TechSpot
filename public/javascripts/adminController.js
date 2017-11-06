angular.module('adminApp', ['ngAnimate'])

    .controller('adminCtrl', function ($scope, $http, $timeout) {
        $scope.editMode = false;


        $scope.editProduct = function (p) {
            $scope.editMode = true;
            $scope.productToEdit = p;

            $scope.addNewProduct = function () {
                $scope.productToEdit = {};
                $scope.productToEdit.type = p.type;
            }

            $scope.changeCat = function (cat) {
                var newCat = cat.url.substr(5);
                $scope.productToEdit.type = newCat;
            }

            $scope.saveProduct = function () {
                console.log($scope.productToEdit);
                $http.post('/admin' + '/' + $scope.productToEdit.type + '/' + $scope.productToEdit._id, angular.toJson($scope.productToEdit)).then(function (response) {
                    $scope.responseMsg = response.data.message;
                    $timeout(function () {
                        $scope.responseMsg = null;
                    }, 2000);
                });
            };

            $scope.deleteProduct = function () {
                $http.delete('/admin' + '/' + p.type + '/' + p._id, angular.toJson($scope.productToEdit)).then(function (response) {
                    $scope.responseMsg = response.data.message;
                    $timeout(function () {
                        $scope.responseMsg = false;
                    }, 2000);
                })
            };

            $scope.deleteComment = function (com) {
                var index = $scope.productToEdit.comments.find(x => x.date == com.date);
                console.log(index);
                $scope.productToEdit.comments.splice(index, 1);
                console.log($scope.productToEdit);
                $http.post('/admin' + '/' + p.type + '/' + p._id, angular.toJson($scope.productToEdit)).then(function (response) {
                    console.log(response);
                });
            };
        }

        $scope.getUserList = function () {
            console.log('ARE WE')
            $http.get('/admin/users').then(function (response) {
                $scope.userList = response.data.filter(x => x.permission != 'admin');
            })
        };

        $scope.getUserList();
        $scope.deleteUser = function(u) {
             $http.delete("/admin/users/" + u._id, angular.toJson(u)).then(function(response){
                 $scope.userDeletedMsg = response.data.message;
                 $scope.getUserList();
             });
        }



    });
