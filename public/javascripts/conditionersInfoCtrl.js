angular.module("conditionersInfoController", [])
    .controller("conditionersInfoCtrl", function($scope, $http) {
        var url = window.location.href.substr(21);
        $http.get('/api' + url).then(function(response) {
            $scope.conditioners = response.data;
        })
    })