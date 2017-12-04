angular.module('searchApp', ['ngAnimate'])
    .controller('searchCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.categories = [
            { name: 'Изберете категория', disable: true},
            { name: 'Телефони', url: '/api/phones' },
            { name: 'Телевизори', url: '/api/tvs' },
            { name: 'Компютри', url: '/api/computers' },
            { name: "Готварски печки", url: "/homeappliances/api/ovens" },
            { name: "Хладилници", url: "/homeappliances/api/fridges" },
            { name: "Перални", url: "/homeappliances/api/washing-machines" },
            { name: "Микровулнови печки", url: "/smallappliances/api/microwave-ovens" },
            { name: "Прахосмукачки", url: "/smallappliances/api/vacuumCleaners" },
            { name: "Климатици", url: "/api/conditioners" }
        ];


        $scope.changeValue = function(item) {
            console.log(item);
            var url = "";
            if (item.url.indexOf("homeappliances") !== -1) {
                url = item.url.substr(0, 15);
                item.url = item.url.substr(15);
            }
            if (item.url.indexOf("smallappliances") !== -1) {
                url = item.url.substr(0, 16);
                item.url = item.url.substr(16);
            }
            $http.get(item.url).then(function(response) {
                $scope.category = url + "" + item.url.substr(4);
                $scope.searchResults = response.data;
            })
        }
        $scope.search = {};




    }]);