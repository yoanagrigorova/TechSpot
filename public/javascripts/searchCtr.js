angular.module('searchApp', ['ngAnimate'])
    .controller('searchCtrl', function($scope, $http) {

        $scope.categories = [
            { name: 'Телефони', url: '/phones' },
            { name: 'Телевизори', url: '/tvs' },
            { name: 'Компютри', url: '/computers' }
        ];

        $scope.selectedOption = {};
        $scope.changeValue = function(item) {
            $scope.selectedOption = item;
            $http.get($scope.selectedOption.url).then(function(response) {
                $scope.searchResults = response.data;
            });
        }
        $scope.search = {};


    });

angular.bootstrap(document.getElementById("homePageApp"), ['searchApp']);