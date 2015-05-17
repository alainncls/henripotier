'use strict';

angular.module('bibliothequeApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, $location, cartService) {
    $scope.books = [];

    $http.get('http://henri-potier.xebia.fr/books').success(function (data) {
      $scope.books = data;
    });

    $scope.addToCart = function (book) {
      cartService.addBook(book);
      $rootScope.$broadcast('changeCart');
    };

    $scope.goTo = function (isbn) {
      $location.path('/book/' + isbn);
    };
  });
