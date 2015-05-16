'use strict';

angular.module('bibliothequeApp')
  .controller('HeaderCtrl', function ($rootScope, $scope, $location, cartService) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.getCartSize = cartService.getCartSize();

    $rootScope.$on('changeCart', function() {
      $scope.getCartSize = cartService.getCartSize();
    });
  });
