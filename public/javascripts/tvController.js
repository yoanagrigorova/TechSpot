angular.module("tvController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("tvCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Телевизори";
        $http.get("/api/tvs").then(function(response) {
            response.data.sort((t1, t2) => t1.price - t2.price);
            $scope.tvs = response.data;

            $scope.slider = {
                minValue: $scope.tvs[0].price,
                maxValue: $scope.tvs[$scope.tvs.length - 1].price,
                options: {
                    floor: $scope.tvs[0].price,
                    ceil: $scope.tvs[$scope.tvs.length - 1].price,
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
            var brands = data.map((tv) => tv.brand).filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var displaySizes = data.map((tv) => tv.displaysize).filter(onlyUnique);
            sort(displaySizes);
            $scope.displaySizes = displaySizes;
            var resolutions = data.map((tv) => tv.resolution).filter(onlyUnique);
            $scope.resolutions = resolutions;
        }
    })

.controller("tvsInfoCtrl", function($scope, $http) {
    var url = window.location.href.substr(21);
    $http.get('/api' + url).then(function(response) {
        $scope.tvs = response.data;
    }).catch(function (response) {
        $rootScope.sessionTimeout = 'Сесията ви е изтекла, моля влезте отново в профила си !'
        $timeout(function () {
            $rootScope.sessionTimeout = false;
            $location.path('/login');
            $scope.logOut();
        }, 2500);
    });
})