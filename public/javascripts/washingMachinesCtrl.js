angular.module("washingMachinesController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("washingMachinesCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
        $scope.search = {};
        $scope.pageTitle = "Перални";

        getMachines();

        function getMachines() {
            dataService.getProducts("washing-machines").then(function(response) {
                response.data.sort((p1, p2) => p1.price - p2.price);
                $scope.washingMachines = response.data;
                $scope.slider = {
                    minValue: $scope.washingMachines[0].price,
                    maxValue: $scope.washingMachines[$scope.washingMachines.length - 1].price,
                    options: {
                        floor: $scope.washingMachines[0].price,
                        ceil: $scope.washingMachines[$scope.washingMachines.length - 1].price,
                        step: 10
                    }
                };
                print(response.data);
            })
        }

        function print(data) {
            var brands = data.map((wm) => wm.brand).filter(dataService.onlyUnique);
            dataService.sort(brands);
            $scope.brands = brands;
            var powers = data.map(wm => wm.spin).filter(dataService.onlyUnique);
            dataService.sort(powers);
            $scope.powers = powers;
            var dimensions = data.map(wm => wm.dimensions).filter(dataService.onlyUnique);
            dataService.sort(dimensions);
            $scope.dimensions = dimensions;
        }
    }])
    .controller("washingMachinesInfoCtrl",['$scope', '$http', 'dataService', function($scope, $http, dataService) {
        var url = window.location.pathname.substr(15);

        getMachine();

        function getMachine() {
            dataService.getProduct(url).then(function(response) {
                $scope.washingMachines = response.data;
            })
        }
    }])