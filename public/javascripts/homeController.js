angular.module("homeController", ["ui.bootstrap"])
    .controller("homeCtrl", ['$scope', '$http', '$rootScope', 'dataService', function($scope, $http, $rootScope, dataService) {
        dataService.getProducts("phones").then(function(response) {
            $scope.phones = response.data;
            $scope.myInterval = 2000;
            $scope.slides = [{
                    image: $scope.phones[0].pictures[0]
                },
                {
                    image: $scope.phones[1].pictures[0]
                },
                {
                    image: $scope.phones[2].pictures[0]
                },
                {
                    image: $scope.phones[3].pictures[0]
                },
                {
                    image: $scope.phones[4].pictures[0]
                },
                {
                    image: $scope.phones[5].pictures[0]
                }
            ];
        })
    }])