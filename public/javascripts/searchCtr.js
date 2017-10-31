angular.module('searchApp', ['ngAnimate'])
    .controller('searchCtrl', function($scope, $http) {

        $scope.categories = [
            { name: 'Телефони', url: '/api/phones' },
            { name: 'Телевизори', url: '/api/tvs' },
            { name: 'Компютри', url: '/api/computers' }
        ];

        $scope.changeValue = function(item) {
            console.log(item);
            $http.get(item.url).then(function(response) {
                $scope.searchResults = response.data;
            })
        }
        $scope.search = {};




    });