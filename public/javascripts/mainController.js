angular.module("MainCtrl", [])
    .controller("MainController", function($scope, $http) {
        $scope.login = false;
        $scope.loginUser = {}
        $http.post("/login", JSON.stringify(user)).then(function(response) {

            console.log(response.data);
            if (response.status == 200) {
                $scope.login = true;
                window.location.href = 'index.html'
            } else {
                window.location.hash = '#loginAgain'
            }
        })
    })