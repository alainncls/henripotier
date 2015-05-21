describe('HeaderCtrl', function () {
  var $scope, $location, controller, cartService;

  beforeEach(module('bibliothequeApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    $location = jasmine.createSpyObj('$location', ['path']);
    $scope = $rootScope.$new();
    controller = $controller('HeaderCtrl', {
      $scope: $scope,
      $location: $location
    });
  }));

  beforeEach(inject(function (_cartService_) {
    cartService = _cartService_;
    cartService.init();
  }));

  it('should contain a cartService', function () {
    expect(cartService).toBeDefined();
  });

  it('should set isActive function', function () {
    expect($scope.isActive).toBeDefined();
  });

  it('should set getCartSize function', function () {
    expect($scope.getCartSize).toBeDefined();
  });
});
