var phone = angular.module("phoneController", ['ngAnimate', 'rzModule', 'ui.bootstrap']);


phone.filter('sizeFilter', [function() {
    return function(phones, config) {
        var filterResult = [];
        angular.forEach(phones, function(phone) {
            if (phone.price >= config.minValue && phone.price <= config.maxValue) {
                filterResult.push(phone);
            };
        });
        return filterResult;


    }
}]);

phone.controller("phonesCtrl", ['$scope', '$http', '$rootScope', 'dataService', function($scope, $http, $rootScope, dataService) {
    $scope.search = {};
    $scope.pageTitle = "Мобилни телефони";

    getPhones();

    function getPhones() {
        dataService.getProducts("phones").then(function(response) {
            response.data.sort((p1, p2) => p1.price - p2.price);
            $scope.phones = response.data;
            $scope.slider = {
                minValue: $scope.phones[0].price,
                maxValue: $scope.phones[$scope.phones.length - 1].price,
                options: {
                    floor: $scope.phones[0].price,
                    ceil: $scope.phones[$scope.phones.length - 1].price,
                    step: 10
                }
            };
            print(response.data);
        }).catch(function(response) {
            $rootScope.sessionTimeout = 'Сесията ви е изтекла, моля влезте отново в профила си !'
            $timeout(function() {
                $rootScope.sessionTimeout = false;
                $location.path('/login');
                $scope.logOut();
            }, 2500);
        });
    }


    function print(data) {
        var brands = data.map((phone) => phone.brand).filter(dataService.onlyUnique);
        dataService.sort(brands);
        $scope.brands = brands;
        var displaySizes = data.map((phone) => phone.displaysize).filter(dataService.onlyUnique);
        dataService.sort(displaySizes);
        $scope.displaySizes = displaySizes;
        var rearCameras = data.map((phone) => phone.rearcamera).filter(dataService.onlyUnique);
        dataService.sort(rearCameras.map(x => parseFloat(x)));
        $scope.rearCameras = rearCameras;
        var iternalMemory = data.map((phone) => phone.iternalmemory).filter(dataService.onlyUnique);
        iternalMemory = iternalMemory.map(x => parseFloat(x)).sort((x1, x2) => x1 - x2).map(x => x + " GB");
        $scope.iternalMemory = iternalMemory;
    }
}])

.controller("phoneInfoCtrl", ['$scope', '$http', '$rootScope', 'dataService', function($scope, $http, $rootScope, dataService) {
    var url = window.location.pathname;

    getPhone(url);

    function getPhone(url) {
        dataService.getProduct(url).then(function(response) {
            $scope.phones = response.data;
        })
    }
}])