angular.module("ovensController", [])
    .controller("ovensCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Фурни за вграждане";
        $http.get("/api/ovens").then(function(response) {
            response.data.sort((p1, p2) => p1.price - p2.price);
            $scope.ovens = response.data;
            console.log('abv');
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
            var brands = data.map((ov) => ov.brand);
            brands = brands.filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var widths = data.map((ov) => ov.width);
            widths = widths.filter(onlyUnique);
            sort(widths);
            $scope.widths = widths;
            var functions = data.map((ov) => ov.functions);
            functions = functions.filter(onlyUnique);
            sort(functions);
            $scope.functions = functions;
            var capacities = data.map((ov) => ov.capacity).filter(onlyUnique);
            sort(capacities);
            $scope.capacities = capacities;
        }
    })