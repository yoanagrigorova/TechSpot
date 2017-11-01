angular.module("washingMachinesController", [])
    .controller("washingMachinesCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Перални";
        $http.get("/api/washing-machines").then(function(response) {
            response.data.sort((p1, p2) => p1.price - p2.price);
            $scope.washingMachines = response.data;
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
            var brands = data.map((wm) => wm.brand).filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var types = data.map((wm) => wm.type).filter(onlyUnique);
            sort(types);
            $scope.types = types;
            var powers = data.map(wm => wm.spin).filter(onlyUnique);
            sort(powers);
            $scope.powers = powers;
            var dimensions = data.map(wm => wm.dimensions).filter(onlyUnique);
            sort(dimensions);
            $scope.dimensions = dimensions;
        }
    })
    .controller("washingMachinesInfoCtrl", function($scope, $http) {
        var url = window.location.pathname.substr(15);
        $http.get("/api" + url).then(function(response) {
            $scope.washingMachines = response.data;
        })
    })