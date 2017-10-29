angular.module("conditionersController", [])
    .controller("conditionersCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Професионална климатична техника";
        $http.get("/conditioners").then(function(response) {
            response.data.sort((p1, p2) => p1.price - p2.price);
            $scope.conditioners = response.data;
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
            var brands = data.map((vc) => vc.brand);
            brands = brands.filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var coolingPowers = data.map((cp) => cp.capacityCooling);
            coolingPowers = coolingPowers.filter(onlyUnique);
            sort(coolingPowers);
            $scope.coolingPowers = coolingPowers;
            var heatingPowers = data.map((cp) => cp.capacityHeating);
            heatingPowers = heatingPowers.filter(onlyUnique);
            sort(heatingPowers);
            $scope.heatingPowers = heatingPowers;
        }
    })