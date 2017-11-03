angular.module("fridgesController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("fridgesCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Хладилници";
        $http.get("/api/fridges").then(function(response) {
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
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        function sort(arr) {
            arr.sort(function(arr1, arr2) {
                if (arr1 > arr2)
                    return 1;
                if (arr1 < arr2)
                    return -1;
                return 0;
            })
        }

        function print(data) {
            var brands = data.map((fr) => fr.brand).filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var totalCapacity = data.map((fr) => fr.totalCapacity).filter(onlyUnique);
            sort(totalCapacity);
            $scope.totalCapacity = totalCapacity;
            var types = data.map((fr) => fr.type).filter(onlyUnique);
            sort(types);
            $scope.types = types;
            var capacitiesF = data.map((fr) => fr.fridgeCapacity).filter(onlyUnique);
            sort(capacitiesF);
            $scope.capacitiesF = capacitiesF;
            var capacitiesR = data.map((fr) => fr.freezerCapacity).filter(onlyUnique);
            capacitiesR = capacitiesR.map(x => parseInt(x)).sort((x1, x2) => x1 - x2).map(x => x + " L");
            $scope.capacitiesR = capacitiesR;
        }
    })
    .controller("fridgesInfoCtrl", function($scope, $http) {
        var url = window.location.pathname.substr(15);
        $http.get("/api" + url).then(function(response) {
            $scope.fridges = response.data;
        })
    })