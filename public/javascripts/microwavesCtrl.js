angular.module("microwaveOvensController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("microwavesCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
        $scope.search = {};
        $scope.pageTitle = "Микровълнови фурни";

        getMicrowaves();

        function getMicrowaves() {
            dataService.getProducts("microwave-ovens").then(function(response) {
                response.data.sort((p1, p2) => p1.price - p2.price);
                $scope.microwaves = response.data;
                $scope.slider = {
                    minValue: $scope.microwaves[0].price,
                    maxValue: $scope.microwaves[$scope.microwaves.length - 1].price,
                    options: {
                        floor: $scope.microwaves[0].price,
                        ceil: $scope.microwaves[$scope.microwaves.length - 1].price,
                        step: 10
                    }
                };
                print(response.data);
            })
        }

        function print(data) {
            var brands = data.map((mw) => mw.brand).filter(dataService.onlyUnique);
            dataService.sort(brands);
            $scope.brands = brands;
            var colors = data.map((mw) => mw.color).filter(dataService.onlyUnique);
            dataService.sort(colors);
            $scope.colors = colors;
            var capacities = data.map((mw) => mw.capacity).filter(dataService.onlyUnique);
            dataService.sort(capacities.map(x => parseFloat(x)));
            $scope.capacities = capacities;
        }
    }])

.controller("microwavesInfoCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
    var url = window.location.pathname.substr(16);

    getMicrowave();

    function getMicrowave() {
        dataService.getProduct(url).then(function(response) {
            $scope.microwaves = response.data;
        })
    }
}]);