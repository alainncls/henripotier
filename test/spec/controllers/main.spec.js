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

  it('should call http://henri-potier.xebia.fr/books on $http', inject(function($httpBackend) {
    $httpBackend.expectGET('http://henri-potier.xebia.fr/books').respond();
    $httpBackend.flush();
  }));
});
