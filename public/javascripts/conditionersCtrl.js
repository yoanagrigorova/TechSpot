angular.module("conditionersController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("conditionersCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
        $scope.search = {};
        $scope.pageTitle = "Професионална климатична техника";

        getAirCond();

        function getAirCond() {
            dataService.getProducts("conditioners").then(function(response) {
                response.data.sort((p1, p2) => p1.price - p2.price);
                $scope.conditioners = response.data;
                $scope.slider = {
                    minValue: $scope.conditioners[0].price,
                    maxValue: $scope.conditioners[$scope.conditioners.length - 1].price,
                    options: {
                        floor: $scope.conditioners[0].price,
                        ceil: $scope.conditioners[$scope.conditioners.length - 1].price,
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
            var coolingPowers = data.map((cp) => cp.capacityCooling).filter(dataService.onlyUnique);
            dataService.sort(coolingPowers);
            $scope.coolingPowers = coolingPowers;
            var heatingPowers = data.map((cp) => cp.capacityHeating).filter(dataService.onlyUnique);
            dataService.sort(heatingPowers);
            $scope.heatingPowers = heatingPowers;
        }
    }])

.controller("conditionersInfoCtrl", ['$scope', '$http', 'dataService' , function($scope, $http, dataService) {
    var url = window.location.pathname;

    getAirCond();

    function getAirCond() {
        dataService.getProduct(url).then(function(response) {
            $scope.conditioners = response.data;
        })
    }
}])