'use strict';

angular.module('bibliothequeApp')
  .controller('CartCtrl', function ($scope, cartService) {
    $scope.offers = [
      {
        'type': 'percentage',
        'value': 5,
        'total': 100
      },
      {
        'type': 'minus',
        'value': 15,
        'total': 100
      },
      {
        'type': 'slice',
        'sliceValue': 100,
        'value': 12,
        'total': 100
      }
    ];

    $scope.cart=cartService.getCart();

  });