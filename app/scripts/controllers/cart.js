'use strict';

angular.module('bibliothequeApp')
  .controller('CartCtrl', function ($scope, $http, cartService) {
    $scope.cart = cartService.getCart();

    var isbnList = function () {
      var list = [];
      angular.forEach($scope.cart, function (book) {
        this.push(book.isbn);
      }, list);
      return list.join(',');
    }

    $http.get('http://henri-potier.xebia.fr/books/' + isbnList() + '/commercialOffers').success(function (data) {
      $scope.offers = data.offers;
      console.log('http://henri-potier.xebia.fr/books/' + isbnList() + '/commercialOffers');
      console.log(data);
    });
  });
