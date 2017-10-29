var phone = angular.module("phoneController", ['ngAnimate', 'rzModule', 'ui.bootstrap']);


phone.filter('sizeFilter', [function () {
    return function (phones, config) {
            var filterResult = [];  
            angular.forEach(phones, function (phone) {
                if (phone.price >= config.minValue && phone.price <= config.maxValue) {
                    filterResult.push(phone);
                };
            });
            return filterResult;
        
        return values;
    }
}]);

phone.controller("phonesCtrl", function ($scope, $http) {
    console.log('test');
    
    
    $scope.search = {};
    $scope.pageTitle = "Мобилни телефони";
    $http.get("/phones").then(function (response) {
        response.data.sort((p1, p2) => p1.price - p2.price);
        $scope.phones = response.data;
        $scope.slider = {
            minValue: $scope.phones[0].price,
            maxValue: $scope.phones[$scope.phones.length-1].price,
            options: {
                floor: $scope.phones[0].price,
                ceil: $scope.phones[$scope.phones.length-1].price,
                step: 50
            }
        };
        print(response.data);
    });


    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function sort(arr) {
        arr.sort(function (arr1, arr2) {
            if (arr1 > arr2)
                return 1;
            if (arr1 < arr2)
                return -1;
            return 0;
        })
    }

    function print(data) {
        var brands = data.map((phone) => phone.brand);
        brands = brands.filter(onlyUnique);
        sort(brands);
        $scope.brands = brands;
        var displaySizes = data.map((phone) => phone.displaysize);
        displaySizes = displaySizes.filter(onlyUnique);
        sort(displaySizes);
        $scope.displaySizes = displaySizes;
        var rearCameras = data.map((phone) => phone.rearcamera);
        rearCameras = rearCameras.filter(onlyUnique);
        sort(rearCameras.map(x => parseFloat(x)));
        $scope.rearCameras = rearCameras;
        var iternalMemory = data.map((phone) => phone.iternalmemory);
        iternalMemory = iternalMemory.filter(onlyUnique);
        iternalMemory = iternalMemory.map(x => parseFloat(x)).sort((x1, x2) => x1 - x2).map(x => x + " GB");
        $scope.iternalMemory = iternalMemory;
    }
});