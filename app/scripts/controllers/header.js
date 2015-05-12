'use strict';

angular.module('bibliothequeApp')
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
