

angular.module('Service', [])
    .service('dataService', ['$http', function($http) {

        this.onlyUnique = function(value, index, self) {
            return self.indexOf(value) === index;
        }

        this.sort = function(arr) {
            arr.sort(function(arr1, arr2) {
                if (arr1 > arr2)
                    return 1;
                if (arr1 < arr2)
                    return -1;
                return 0;
            })
        }

        var urlBase = '/api';

        this.getProducts = function(products) {
            return $http.get(urlBase + "/" + products);
        };

        this.getProduct = function(id) {
            return $http.get(urlBase + id);
        };

        this.insertProduct = function(base, category, product) {
            return $http.post(base + "/" + category, product);
        };

        this.updateProduct = function(base, category, product) {
            return $http.put(base + "/" + category, product)
        };

        this.deleteProduct = function(base, category) {
            return $http.delete(base + "/" + category);
        };

    }]);