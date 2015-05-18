'use strict';

angular.module('bibliothequeApp')
  .controller('CartCtrl', function ($rootScope, $scope, $location, $http, cartService) {
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
      calculateOffers();
    });

    var getTotalCart = function () {
      var totalCart = 0;

      angular.forEach($scope.cart, function (book) {
        totalCart += (book.price) * (book.quantity);
      });
      return totalCart;
    };

    var getTotalOffer = function (offer) {
      if (offer.type === 'percentage') {
        offer.total = (getTotalCart($scope.cart) * (1 - offer.value / 100)).toFixed(2);
      }
      else if (offer.type === 'minus') {
        offer.total = (getTotalCart($scope.cart) - offer.value).toFixed(2);
      }
      else if (offer.type === 'slice') {
        var slices = Math.floor(getTotalCart($scope.cart) / offer.sliceValue);
        offer.total = (getTotalCart($scope.cart) - offer.value * slices).toFixed(2);
      }
    };

    var calculateOffers = function () {
      angular.forEach($scope.offers, function (offer) {
        getTotalOffer(offer);
      });
      angular.forEach($scope.offers, function (offer) {
        $scope.chooseBestOffer(offer);
      });
    };

    $scope.deleteFromCart = function (book) {
      cartService.removeBook(book);
      $http.get('http://henri-potier.xebia.fr/books/' + isbnList() + '/commercialOffers').success(function (data) {
        $scope.offers = data.offers;
        calculateOffers();
      }).error(function () {
        $scope.offers = [];
      });
      $rootScope.$broadcast('changeCart');
    };

    $scope.incrQtity = function (book) {
      cartService.incrBook(book);
      calculateOffers();
      $rootScope.$broadcast('changeQtity');
      $rootScope.$broadcast('changeCart');
    };

    $scope.decrQtity = function (book) {
      if (book.quantity === 1) {
        $scope.deleteFromCart(book);
      }
      else {
        cartService.decrBook(book);
        calculateOffers();
        $rootScope.$broadcast('changeQtity');
        $rootScope.$broadcast('changeCart');
      }
    };

    $scope.chooseBestOffer = function (offer) {
      var bool = true;
      offer.best = false;
      angular.forEach($scope.offers, function (of) {
        if (parseFloat(offer.total) > parseFloat(of.total)) {
          bool = false;
        }
      });
      if (bool === true) {
        offer.best = true;
      }
    };

    $rootScope.$on('changeQtity', function () {
      $scope.cart = cartService.getCart();
    });

    $scope.goTo = function (isbn) {
      $location.path('/book/' + isbn);
    };
  });
