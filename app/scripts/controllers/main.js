'use strict';

angular.module('bibliothequeApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {
    $scope.books = [];

    $http.get('http://henri-potier.xebia.fr/books').success( function (data) {
      $scope.books = data;
    });

    if($rootScope.cart == []){

    }

  });
