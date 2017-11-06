angular.module("microwaveOvensController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("microwavesCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Микровълнови фурни";
        $http.get("/api/microwave-ovens").then(function(response) {
            response.data.sort((p1, p2) => p1.price - p2.price);
            $scope.microwaves = response.data;
            $scope.slider = {
                minValue: $scope.microwaves[0].price,
                maxValue: $scope.microwaves[$scope.microwaves.length - 1].price,
                options: {
                    floor: $scope.microwaves[0].price,
                    ceil: $scope.microwaves[$scope.microwaves.length - 1].price,
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
            var brands = data.map((mw) => mw.brand).filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var colors = data.map((mw) => mw.color).filter(onlyUnique);
            sort(colors);
            $scope.colors = colors;
            var capacities = data.map((mw) => mw.capacity).filter(onlyUnique);
            sort(capacities.map(x => parseFloat(x)));
            $scope.capacities = capacities;
        }
    })

.controller("microwavesInfoCtrl", function($scope, $http) {
    var url = window.location.pathname.substr(16);
    $http.get('/api' + url).then(function(response) {
        $scope.microwaves = response.data;
    })
})