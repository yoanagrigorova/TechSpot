angular.module("microwaveOvensController", [])
    .controller("microwavesCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Микровълнови фурни";
        $http.get("/microwave-ovens").then(function(response) {
            response.data.sort((p1, p2) => p1.price - p2.price);
            $scope.microwaves = response.data;
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
            var brands = data.map((mw) => mw.brand);
            brands = brands.filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var colors = data.map((mw) => mw.color);
            colors = colors.filter(onlyUnique);
            sort(colors);
            $scope.colors = colors;
            var capacities = data.map((mw) => mw.capacity);
            capacities = capacities.filter(onlyUnique);
            sort(capacities.map(x => parseFloat(x)));
            $scope.capacities = capacities;
        }
    })