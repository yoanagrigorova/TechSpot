angular.module("tvController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("tvCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
        $scope.search = {};
        $scope.pageTitle = "Телевизори";

        getTvs();

        function getTvs() {
            dataService.getProducts("tvs").then(function(response) {
                response.data.sort((t1, t2) => t1.price - t2.price);
                $scope.tvs = response.data;

                $scope.slider = {
                    minValue: $scope.tvs[0].price,
                    maxValue: $scope.tvs[$scope.tvs.length - 1].price,
                    options: {
                        floor: $scope.tvs[0].price,
                        ceil: $scope.tvs[$scope.tvs.length - 1].price,
                        step: 10
                    }
                };
                print(response.data);
            })
        }

        function print(data) {
            var brands = data.map((tv) => tv.brand).filter(dataService.onlyUnique);
            dataService.sort(brands);
            $scope.brands = brands;
            var displaySizes = data.map((tv) => tv.displaysize).filter(dataService.onlyUnique);
            dataService.sort(displaySizes);
            $scope.displaySizes = displaySizes;
            var resolutions = data.map((tv) => tv.resolution).filter(dataService.onlyUnique);
            $scope.resolutions = resolutions;
        }
    }])

.controller("tvsInfoCtrl", ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
    var url = window.location.pathname;
    getTV();
    function getTV() {
        dataService.getProduct(url).then(function(response) {
            $scope.tvs = response.data;
        }).catch(function(response) {
            $rootScope.sessionTimeout = 'Сесията ви е изтекла, моля влезте отново в профила си !'
            $timeout(function() {
                $rootScope.sessionTimeout = false;
                $location.path('/login');
                $scope.logOut();
            }, 2500);
        });
    }
}])