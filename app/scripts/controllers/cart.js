'use strict';

angular.module('bibliothequeApp')
  .controller('CartCtrl', function ($rootScope, $scope, $http, cartService) {
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
      angular.forEach($scope.offers, getTotalOffer);
    });

    var getTotalCart = function () {
      var totalCart = 0;

      angular.forEach($scope.cart, function (book) {
        totalCart += book.price;
      });
      return totalCart;
    };

    var getTotalOffer = function (offer) {
      if (offer.type === 'percentage') {
        offer.total = Math.round(getTotalCart($scope.cart) * (1 - offer.value / 100)).toFixed(2);

      }
      else if (offer.type === 'minus') {
        offer.total = Math.round(getTotalCart($scope.cart) - offer.value).toFixed(2);
      }
      else if (offer.type === 'slice') {
        var slices = Math.floor(getTotalCart($scope.cart) / offer.sliceValue);
        offer.total = Math.round(getTotalCart($scope.cart) - offer.value * slices).toFixed(2);
      }
    };

    $scope.deleteFromCart = function (book) {
      cartService.removeBook(book);
      $http.get('http://henri-potier.xebia.fr/books/' + isbnList() + '/commercialOffers').success(function (data) {
        $scope.offers = data.offers;
        angular.forEach($scope.offers, getTotalOffer);
        console.log('Reload offers');
      }).error(function () {
        $scope.offers = [];
      });
      $rootScope.$broadcast('changeCart');
    };

    $scope.isBestOffer = function (offer) {
      var bool = true;
      angular.forEach($scope.offers, function (of) {
        if (offer.total > of.total) {
          bool = false;
        }
      });
      return bool;
    };
  });
