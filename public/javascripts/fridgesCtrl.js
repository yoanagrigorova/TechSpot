angular.module("fridgesController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("fridgesCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
        $scope.search = {};
        $scope.pageTitle = "Хладилници";

        getFridges();

        function getFridges() {
            dataService.getProducts("fridges").then(function(response) {
                response.data.sort((p1, p2) => p1.price - p2.price);
                $scope.fridges = response.data;
                $scope.slider = {
                    minValue: $scope.fridges[0].price,
                    maxValue: $scope.fridges[$scope.fridges.length - 1].price,
                    options: {
                        floor: $scope.fridges[0].price,
                        ceil: $scope.fridges[$scope.fridges.length - 1].price,
                        step: 10
                    }
                };
                print(response.data);
            })
        }


        function print(data) {
            var brands = data.map((fr) => fr.brand).filter(dataService.onlyUnique);
            dataService.sort(brands);
            $scope.brands = brands;
            var totalCapacity = data.map((fr) => fr.totalCapacity).filter(dataService.onlyUnique);
            dataService.sort(totalCapacity);
            $scope.totalCapacity = totalCapacity;
            var capacitiesF = data.map((fr) => fr.fridgeCapacity).filter(dataService.onlyUnique);
            dataService.sort(capacitiesF);
            $scope.capacitiesF = capacitiesF;
            var capacitiesR = data.map((fr) => fr.freezerCapacity).filter(dataService.onlyUnique);
            capacitiesR = capacitiesR.map(x => parseInt(x)).sort((x1, x2) => x1 - x2).map(x => x + " L");
            $scope.capacitiesR = capacitiesR;
        }
    }])
    .controller("fridgesInfoCtrl", ['$scope','$http', 'dataService', function($scope, $http, dataService) {
        var url = window.location.pathname.substr(15);

        getFridge();

        function getFridge() {
            dataService.getProduct(url).then(function(response) {
                $scope.fridges = response.data;
            })
        }
    }])