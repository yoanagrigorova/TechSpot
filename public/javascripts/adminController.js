export default angular.module('adminApp', ['ngAnimate'])

.controller('adminCtrl', ['$scope', '$http', '$timeout', 'dataService', '$route', function($scope, $http, $timeout, dataService, $route) {
    $scope.editMode = false;


    $scope.editProduct = function(p) {
        $scope.editMode = true;
        $scope.productToEdit = p;

        $scope.addNewProduct = function() {
            $scope.productToEdit = {};
            $scope.productToEdit.type = p.type;
        }

        $scope.changeCat = function(cat) {
            var newCat = cat.url.substr(5);
            $scope.productToEdit.type = newCat;
        }

        $scope.saveProduct = function() {
            console.log($scope.productToEdit);

            save();

            function save() {
                dataService.insertProduct("/admin", $scope.productToEdit.type + '/' + $scope.productToEdit._id, angular.toJson($scope.productToEdit)).then(function(response) {
                    $scope.responseMsg = response.data.message;
                    $timeout(function() {
                        $scope.responseMsg = null;
                    }, 2000);
                })
            }
        };

        $scope.deleteProduct = function() {

            deleteP();

            function deleteP() {
                dataService.deleteProduct("/admin", p.type + "/" + p._id).then(function(response) {
                    $scope.responseMsg = response.data.message;
                    $timeout(function() {
                        $scope.responseMsg = false;
                        $route.reload();
                    }, 2000);
                })
            }
        };

        $scope.deleteComment = function(com) {
            var index = $scope.productToEdit.comments.find(x => x.date == com.date);
            $scope.productToEdit.comments.splice(index, 1);

            deleteCom();

            function deleteCom() {
                dataService.insertProduct("/admin", p.type + '/' + p._id, angular.toJson($scope.productToEdit)).then(function(response) {
                    console.log(response);
                })
            }
        };
    }

    $scope.getUserList = function() {
        $http.get('/admin/users').then(function(response) {
            $scope.userList = response.data.filter(x => x.permission != 'admin');
        })
    };

    $scope.getUserList();
    $scope.deleteUser = function(u) {

        deleteUsers();

        function deleteUsers() {
            dataService.deleteProduct("/admin/users", u._id).then(function(response) {
                $scope.userDeletedMsg = response.data.message;
                $scope.getUserList();
            })
        }
    }

}]);