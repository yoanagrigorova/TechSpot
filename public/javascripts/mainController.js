angular.module("MainCtrl", [])
    .controller("MainController", function($scope, $http) {
        $scope.addTOBasket = function() {
            var id = this.$$watchers[0].last;
            console.log(this.$$watchers[0].last);
            $http.get("/phones/" + id).then(function(response) {
                console.log(response.data);
                var product = response.data[0];
                $http.post("/login", JSON.stringify({ username: 'grigorovajoana@gmail.com', password: '123456' })).then(function(response) {
                    console.log(response.data);
                    var user = response.data[0];
                    user.products.push(product);

                })
            })

        }
    })