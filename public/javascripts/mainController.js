angular.module("MainCtrl", [])
    .controller("MainController", function($scope, $http) {
        $scope.loginUser = {}
        $scope.addTOBasket = function(user) {
            console.log(user);
            $http.post("/login", JSON.stringify(user)).then(function(response) {
                
                console.log(response.data);
                if (response.status == 200){
                    window.location.href = 'index.html'
                } else {
                    window.location.hash = '#loginAgain'
                }
                   
            })
        }
    })