angular.module("ovensController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("ovensCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Фурни за вграждане";
        $http.get("/api/ovens").then(function(response) {
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
            var brands = data.map((ov) => ov.brand).filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var widths = data.map((ov) => ov.width).filter(onlyUnique);
            sort(widths);
            $scope.widths = widths;
            var functions = data.map((ov) => ov.functions).filter(onlyUnique);
            sort(functions);
            $scope.functions = functions;
            var capacities = data.map((ov) => ov.capacity).filter(onlyUnique);
            sort(capacities);
            $scope.capacities = capacities;
        }
    })
    .controller("ovensInfoCtrl", function($scope, $http) {
        var url = window.location.pathname.substr(15);
        $http.get("/api" + url).then(function(response) {
            $scope.ovens = response.data;
        })
    })