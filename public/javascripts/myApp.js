var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateURL: "/views/index.hbs",
        controller: "/routes/index.js"
    })
})