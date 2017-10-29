angular.module("conditionersInfoController", [])
    .controller("conditionersInfoCtrl", function($scope, $http) {
        var url = window.location.hash.substr(2);
        $http.get(url).then(function(response) {
            $scope.conditioners = response.data;
        })
    })