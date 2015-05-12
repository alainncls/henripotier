'use strict';

angular.module('bibliothequeApp')
  .controller('MainCtrl', function ($scope, $http, cartService) {
    $scope.books = [];

    $http.get('http://henri-potier.xebia.fr/books').success( function (data) {
      $scope.books = data;
    });

    function findBookByIsbn(isbn){
      angular.forEach(books, function(index, value){
        if (value.isbn == isbn){
          return value;
        }
      })
    }

    $scope.addToCart = function (book){
      console.log(book);
      cartService.addBook(book)
    }
  });
