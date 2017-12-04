angular.module("ovensController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("ovensCtrl", ['$scope', '$http', 'dataSerivce', function($scope, $http, dataService) {
        $scope.search = {};
        $scope.pageTitle = "Фурни за вграждане";

        getOvens();

        function getOvens() {
            dataService.getProducts("ovens").then(function(response) {
                response.data.sort((p1, p2) => p1.price - p2.price);
                $scope.ovens = response.data;
                $scope.slider = {
                    minValue: $scope.ovens[0].price,
                    maxValue: $scope.ovens[$scope.ovens.length - 1].price,
                    options: {
                        floor: $scope.ovens[0].price,
                        ceil: $scope.ovens[$scope.ovens.length - 1].price,
                        step: 10
                    }
                };
                print(response.data);
            })
        }

        function print(data) {
            var brands = data.map((ov) => ov.brand).filter(dataService.onlyUnique);
            dataService.sort(brands);
            $scope.brands = brands;
            var widths = data.map((ov) => ov.width).filter(dataService.onlyUnique);
            dataService.sort(widths);
            $scope.widths = widths;
            var functions = data.map((ov) => ov.functions).filter(dataService.onlyUnique);
            dataService.sort(functions);
            $scope.functions = functions;
            var capacities = data.map((ov) => ov.capacity).filter(dataService.onlyUnique);
            dataService.sort(capacities);
            $scope.capacities = capacities;
        }
    }])

    .controller("ovensInfoCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
        var url = window.location.pathname.substr(15);

        getOven();

        function getOven() {
            dataService.getProduct(url).then(function(response) {
                $scope.ovens = response.data;
            })
        }
    }])