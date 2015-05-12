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
    };

    $http.get('http://henri-potier.xebia.fr/books/' + isbnList() + '/commercialOffers').success(function (data) {
      $scope.offers = data.offers;
      console.log('http://henri-potier.xebia.fr/books/' + isbnList() + '/commercialOffers');
      console.log(data);
    });

    var getTotalCart = function (cart) {
      var totalCart = 0;

      angular.forEach($scope.cart, function (book) {
        totalCart += book.price;
      });

      console.log("Total cart = " + totalCart);
      return totalCart;
    };

    $scope.getTotalOffer = function (offer) {
      if (offer.type === 'percentage') {
        return Math.round(getTotalCart($scope.cart) * (1 - offer.value / 100)).toFixed(2);
      }
      else if (offer.type === 'minus') {
        return Math.round(getTotalCart($scope.cart) - offer.value).toFixed(2);
      }
      else if (offer.type === 'slice') {
        var slices = Math.floor(getTotalCart($scope.cart) / offer.sliceValue);
        return Math.round(getTotalCart($scope.cart) - offer.value * slices).toFixed(2);
      }
    };
  });
