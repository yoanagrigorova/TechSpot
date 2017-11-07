var app = angular.module("myApp", ["ngRoute", "phoneController", "tvController", "computersController",
    "microwaveOvensController", "vacuumsController", "conditionersController", "ovensController", 'searchApp',
    "MainCtrl", "fridgesController", "washingMachinesController", "profileController", 'adminApp', "homeController",
    "Service"
]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when("/login", {
            templateUrl: "login.htm"
        })
        .when("/registration", {
            templateUrl: "registration.htm"
        })
        .when("/phones", {
            templateUrl: "phones.htm",
            controller: "phonesCtrl"
        })
        .when("/tvs", {
            templateUrl: "tvs.htm",
            controller: "tvCtrl"
        })
        .when("/computers", {
            templateUrl: "computers.htm",
            controller: "computersCtrl"
        })
        .when("/phones/:_id", {
            templateUrl: "phoneInfo.htm",
            controller: "phoneInfoCtrl"
        })
        .when("/tvs/:_id", {
            templateUrl: "tvsInfo.htm",
            controller: "tvsInfoCtrl"
        })
        .when("/computers/:_id", {
            templateUrl: "computersInfo.htm",
            controller: "computersInfoCtrl"
        })
        .when("/smallappliances/microwave-ovens", {
            templateUrl: "microwaves.htm",
            controller: "microwavesCtrl"
        })
        .when("/smallappliances/microwave-ovens/:_id", {
            templateUrl: "microwavesInfo.htm",
            controller: "microwavesInfoCtrl"
        })
        .when("/smallappliances/vacuumCleaners", {
            templateUrl: "vacuums.htm",
            controller: "vacuumsCtrl"
        })
        .when("/smallappliances/vacuumCleaners/:_id", {
            templateUrl: "vacuumsInfo.htm",
            controller: "vocuumsInfoCtrl"
        })
        .when("/conditioners", {
            templateUrl: "conditioners.htm",
            controller: "conditionersCtrl"
        })
        .when("/conditioners/:_id", {
            templateUrl: "conditionersInfo.htm",
            controller: "conditionersInfoCtrl"
        })
        .when("/homeappliances/ovens", {
            templateUrl: "ovens.htm",
            controller: "ovensCtrl"
        })
        .when("*", {
            controller: "MainController"
        })
        .when("/homeappliances", {
            templateUrl: "homeAppliances.htm"
        })
        .when("/homeappliances/ovens/:_id", {
            templateUrl: "ovensInfo.htm",
            controller: "ovensInfoCtrl"
        })
        .when("/homeappliances/fridges", {
            templateUrl: "fridges.htm",
            controller: "fridgesCtrl"
        })
        .when("/homeappliances/fridges/:_id", {
            templateUrl: "fridgesInfo.htm",
            controller: "fridgesInfoCtrl"
        })
        .when("/homeappliances/washing-machines", {
            templateUrl: "washingMachines.htm",
            controller: "washingMachinesCtrl"
        })
        .when("/homeappliances/washing-machines/:_id", {
            templateUrl: "washingMachinesInfo.htm",
            controller: "washingMachinesInfoCtrl"
        })
        .when("/smallappliances", {
            templateUrl: "smallAppliances.htm"
        })
        .when("/myProfile", {
            templateUrl: "profile.htm",
            controller: "profileCtrl"
        })

    .when("/compare", {
            templateUrl: "compare.htm"
        })
        .when("/cart", {
            templateUrl: "cart.htm"
        })
        .when("/checkout", {
            templateUrl: "checkout.htm"
        })
        .when("/favorites", {
            templateUrl: "favorites.htm"
        })
        .otherwise({
            templateUrl: "home.htm",
            controller: "homeCtrl"
        })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});