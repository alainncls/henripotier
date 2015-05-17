'use strict';

angular
  .module('bibliothequeApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        controller: 'MainCtrl'
      })
      .when('/book/:isbn', {
        templateUrl: 'views/book.html',
        controller: 'BookCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(['cartService', function (cartService) {
    cartService.init();
  }])
;
