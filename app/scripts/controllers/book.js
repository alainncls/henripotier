'use strict';

angular.module('bibliothequeApp')
  .controller('BookCtrl', function ($rootScope, $scope, $http, $routeParams, cartService) {
    $scope.books = [];
    $scope.book = {};

    $http.get('http://henri-potier.xebia.fr/books').success(function (data) {
      $scope.books = data;
      $scope.findRequestedBook($routeParams.isbn);
    });

    $scope.findRequestedBook = function (isbn) {
      angular.forEach($scope.books, function (book) {
        if (book.isbn === isbn) {
          $scope.book = book;
          return book;
        }
        return 'error';
      });
    };

    $scope.addToCart = function (book) {
      cartService.addBook(book);
      $rootScope.$broadcast('changeCart');
    };
  });
