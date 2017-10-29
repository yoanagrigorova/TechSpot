angular.module("tvController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("tvCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Телевизори";
        $http.get("/tvs").then(function(response) {
            response.data.sort((t1, t2) => t1.price - t2.price);
            $scope.tvs = response.data;
           
            $scope.slider = {
                minValue: $scope.tvs[0].price,
                maxValue: $scope.tvs[$scope.tvs.length-1].price,
                options: {
                    floor: $scope.tvs[0].price,
                    ceil: $scope.tvs[$scope.tvs.length-1].price,
                    step: 50
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
            var brands = data.map((tv) => tv.brand);
            brands = brands.filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var displaySizes = data.map((tv) => tv.displaysize);
            displaySizes = displaySizes.filter(onlyUnique);
            sort(displaySizes);
            $scope.displaySizes = displaySizes;
            var resolutions = data.map((tv) => tv.resolution);
            resolutions = resolutions.filter(onlyUnique);
            $scope.resolutions = resolutions;
        }
    })