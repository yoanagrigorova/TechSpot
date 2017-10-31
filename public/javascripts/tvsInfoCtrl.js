angular.module("tvsInfoController", [])
    .controller("tvsInfoCtrl", function($scope, $http) {
        var url = window.location.href.substr(21);
        $http.get('/api' + url).then(function(response) {
            $scope.tvs = response.data;
        })
    })