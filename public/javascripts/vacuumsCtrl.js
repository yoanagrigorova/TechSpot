angular.module("vacuumsController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("vacuumsCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Прахосмукачки";
        $http.get("/api/vacuumCleaners").then(function(response) {
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
            var brands = data.map((vc) => vc.brand).filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var powers = data.map((vc) => vc.power).filter(onlyUnique);
            powers = powers.map(x => parseFloat(x)).sort((x1, x2) => x1 - x2).map(x => x + ".0 W");
            $scope.powers = powers;
            var capacities = data.map((mw) => mw.capacity).filter(onlyUnique);
            sort(capacities);
            $scope.capacities = capacities;
            var types = data.map((vc) => vc.type).filter(onlyUnique);
            sort(types);
            $scope.types = types;
        }
    })

.controller("vocuumsInfoCtrl", function($scope, $http) {
    var url = window.location.pathname.substr(16);
    $http.get("/api" + url).then(function(response) {
        $scope.vacuums = response.data;
    })
})