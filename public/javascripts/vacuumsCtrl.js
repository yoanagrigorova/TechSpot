angular.module("vacuumsController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("vacuumsCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
        $scope.search = {};
        $scope.pageTitle = "Прахосмукачки";

        getVacuums();

        function getVacuums() {
            dataService.getProducts("vacuumCleaners").then(function(response) {
                response.data.sort((p1, p2) => p1.price - p2.price);
                $scope.vacuums = response.data;
                $scope.slider = {
                    minValue: $scope.vacuums[0].price,
                    maxValue: $scope.vacuums[$scope.vacuums.length - 1].price,
                    options: {
                        floor: $scope.vacuums[0].price,
                        ceil: $scope.vacuums[$scope.vacuums.length - 1].price,
                        step: 10
                    }
                };
                print(response.data);
            })
        }

        function print(data) {
            var brands = data.map((vc) => vc.brand).filter(dataService.onlyUnique);
            dataService.sort(brands);
            $scope.brands = brands;
            var powers = data.map((vc) => vc.power).filter(dataService.onlyUnique);
            powers = powers.map(x => parseFloat(x)).sort((x1, x2) => x1 - x2).map(x => x + ".0 W");
            $scope.powers = powers;
            var capacities = data.map((mw) => mw.capacity).filter(dataService.onlyUnique);
            dataService.sort(capacities);
            $scope.capacities = capacities;
        }
    }])

.controller("vocuumsInfoCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
    var url = window.location.pathname.substr(16);

    getVacuum();

    function getVacuum() {
        dataService.getProduct(url).then(function(response) {
            $scope.vacuums = response.data;
        })
    }
}])