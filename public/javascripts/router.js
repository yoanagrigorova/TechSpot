
let angular = require('angular');
let sliderCss = require('../stylesheets/slider-css.css');
let angularSlider = require('angularjs-slider');
let angularRoute = require('angular-route');
let angularAnimate = require('angular-animate');
let angularCookies = require('angular-cookies');
let angularBootstrap = require('angular-ui-bootstrap');

let css = require("../stylesheets/style.css");
let bootstrapJS = require('./bootstrap-js');
let bootstrap = require('../stylesheets/bootstrap.min.css');

var requireTest = require.context('./', true, /\.js$/);
requireTest.keys().forEach(requireTest);

var app = angular.module("myApp", ["ngRoute", "phoneController", "tvController", "computersController",
    "microwaveOvensController", "vacuumsController", "conditionersController", "ovensController", 'searchApp',
    "MainCtrl", "fridgesController", "washingMachinesController", "profileController", 'adminApp', "homeController",
    "Service"
]);



app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider

        .when("/login", {
            template: require("../views/login.htm")
        })
        .when("/registration", {
            template: require("../views/registration.htm")
        })
        .when("/phones", {
            template: require("../views/phones.htm"),
            controller: "phonesCtrl"
        })
        .when("/tvs", {
            template: require("../views/tvs.htm"),
            controller: "tvCtrl"
        })
        .when("/computers", {
            template: require("../views/computers.htm"),
            controller: "computersCtrl"
        })
        .when("/phones/:_id", {
            template: require("../views/phoneInfo.htm"),
            controller: "phoneInfoCtrl"
        })
        .when("/tvs/:_id", {
            template: require("../views/tvsInfo.htm"),
            controller: "tvsInfoCtrl"
        })
        .when("/computers/:_id", {
            template: require("../views/computersInfo.htm"),
            controller: "computersInfoCtrl"
        })
        .when("/smallappliances/microwave-ovens", {
            template: require("../views/microwaves.htm"),
            controller: "microwavesCtrl"
        })
        .when("/smallappliances/microwave-ovens/:_id", {
            template: require("../views/microwavesInfo.htm"),
            controller: "microwavesInfoCtrl"
        })
        .when("/smallappliances/vacuumCleaners", {
            template: require("../views/vacuums.htm"),
            controller: "vacuumsCtrl"
        })
        .when("/smallappliances/vacuumCleaners/:_id", {
            template: require("../views/vacuumsInfo.htm"),
            controller: "vocuumsInfoCtrl"
        })
        .when("/conditioners", {
            template: require("../views/conditioners.htm"),
            controller: "conditionersCtrl"
        })
        .when("/conditioners/:_id", {
            template: require("../views/conditionersInfo.htm"),
            controller: "conditionersInfoCtrl"
        })
        .when("/homeappliances/ovens", {
            template: require("../views/ovens.htm"),
            controller: "ovensCtrl"
        })
        .when("*", {
            controller: "MainController"
        })
        .when("/homeappliances", {
            template: require("../views/homeAppliances.htm")
        })
        .when("/homeappliances/ovens/:_id", {
            template: require("../views/ovensInfo.htm"),
            controller: "ovensInfoCtrl"
        })
        .when("/homeappliances/fridges", {
            template: require("../views/fridges.htm"),
            controller: "fridgesCtrl"
        })
        .when("/homeappliances/fridges/:_id", {
            template: require("../views/fridgesInfo.htm"),
            controller: "fridgesInfoCtrl"
        })
        .when("/homeappliances/washing-machines", {
            template: require("../views/washingMachines.htm"),
            controller: "washingMachinesCtrl"
        })
        .when("/homeappliances/washing-machines/:_id", {
            template: require("../views/washingMachinesInfo.htm"),
            controller: "washingMachinesInfoCtrl"
        })
        .when("/smallappliances", {
            template: require("../views/smallAppliances.htm")
        })
        .when("/myProfile", {
            template: require("../views/profile.htm"),
            controller: "profileCtrl"
        })

        .when("/compare", {
            template: require("../views/compare.htm")
        })
        .when("/cart", {
            template: require("../views/cart.htm")
        })
        .when("/checkout", {
            template: require("../views/checkout.htm")
        })
        .when("/favorites", {
            template: require("../views/favorites.htm")
        })
        .otherwise({
            template: require("../views/home.htm"),
            controller: "homeCtrl"
        })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);