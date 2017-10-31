angular.module("phoneInfoController", [])
    .controller("phoneInfoCtrl", function($scope, $http) {
        var url = window.location.href.substr(21);
        console.log(url);
        console.log('test')
        $http.get('/api' + url).then(function(response) {
            $scope.phones = response.data;
        })
    })