angular.module("microwavesInfoController", [])
    .controller("microwavesInfoCtrl", function($scope, $http) {
        var url = window.location.href.substr(21);
        $http.get('/api' + url).then(function(response) {
            $scope.microwaves = response.data;
        })
    })