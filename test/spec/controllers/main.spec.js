describe('MainCtrl', function() {
  var $scope, controller;

  beforeEach(module('bibliothequeApp'));
  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('MainCtrl', {
      $scope: $scope
    });
  }));

  it('should set books var', function() {
    expect($scope.books).toBeDefined();
  });
});
