angular.module("conditionersController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("conditionersCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Професионална климатична техника";
        $http.get("/api/conditioners").then(function(response) {
            response.data.sort((p1, p2) => p1.price - p2.price);
            $scope.conditioners = response.data;
            $scope.slider = {
                minValue: $scope.conditioners[0].price,
                maxValue: $scope.conditioners[$scope.conditioners.length - 1].price,
                options: {
                    floor: $scope.conditioners[0].price,
                    ceil: $scope.conditioners[$scope.conditioners.length - 1].price,
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
            var coolingPowers = data.map((cp) => cp.capacityCooling).filter(onlyUnique);
            sort(coolingPowers);
            $scope.coolingPowers = coolingPowers;
            var heatingPowers = data.map((cp) => cp.capacityHeating).filter(onlyUnique);
            sort(heatingPowers);
            $scope.heatingPowers = heatingPowers;
        }
    })

.controller("conditionersInfoCtrl", function($scope, $http) {
    var url = window.location.href.substr(21);
    $http.get('/api' + url).then(function(response) {
        $scope.conditioners = response.data;
    })
})