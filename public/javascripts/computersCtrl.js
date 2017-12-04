angular.module("computersController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("computersCtrl", ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
        $scope.search = {};
        $scope.pageTitle = "Компютри";

        getComputers();

        function getComputers() {
            dataService.getProducts("computers").then(function (response) {
                response.data.sort((c1, c2) => c1.price - c2.price);
                $scope.computers = response.data;
                $scope.slider = {
                    minValue: $scope.computers[0].price,
                    maxValue: $scope.computers[$scope.computers.length - 1].price,
                    options: {
                        floor: $scope.computers[0].price,
                        ceil: $scope.computers[$scope.computers.length - 1].price,
                        step: 10
                    }
                };
                print(response.data);
            })
        }


        function print(data) {
            var brands = data.map((comp) => comp.brand).filter(dataService.onlyUnique);
            dataService.sort(brands);
            $scope.brands = brands;
            var displaySizes = data.map((comp) => comp.displaysize).filter(dataService.onlyUnique);
            dataService.sort(displaySizes);
            $scope.displaySizes = displaySizes;
            var rams = data.map((comp) => comp.ram).filter(dataService.onlyUnique);
            dataService.sort(rams);
            $scope.rams = rams;
            var hdds = data.map((comp) => comp.hdd).filter(dataService.onlyUnique);
            hdds = hdds.map(x => parseFloat(x)).sort((x1, x2) => x1 - x2).map(x => x + " GB")
            $scope.hdds = hdds;
            var oss = data.map((comp) => comp.os).filter(dataService.onlyUnique);
            dataService.sort(oss);
            $scope.oss = oss;
            var processors = data.map((comp) => comp.processor).filter(dataService.onlyUnique);
            dataService.sort(processors);
            $scope.processors = processors;
        }
    }])

    .controller("computersInfoCtrl", ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
        var url = window.location.pathname;

        getComputer();

        function getComputer() {
            dataService.getProduct(url).then(function (response) {
                $scope.computers = response.data;
            })
        }
    }])