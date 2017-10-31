angular.module("computersInfoController", [])
    .controller("computersInfoCtrl", function($scope, $http) {
        var url = window.location.href.substr(21);
        $http.get('/api' + url).then(function(response) {
            $scope.computers = response.data;
        })
    })