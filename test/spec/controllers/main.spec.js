describe('MainCtrl', function () {
  var $scope, $location, controller, cartService;

  beforeEach(module('bibliothequeApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    $location = jasmine.createSpyObj('$location', ['path']);
    $scope = $rootScope.$new();
    controller = $controller('MainCtrl', {
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

  it('should set books var', function () {
    expect($scope.books).toBeDefined();
  });

  it('should set addToCart() function', function () {
    expect($scope.addToCart).toBeDefined();
  });

  it('should set goTo()', function () {
    expect($scope.goTo).toBeDefined();
  });

  it('should get books from http://henri-potier.xebia.fr/books on $http', inject(function ($httpBackend) {
    $httpBackend.expectGET('http://henri-potier.xebia.fr/books').respond();
    $httpBackend.flush();
  }));

  describe('$scope.addToCart', function () {
    it('should add a book to the cart', function () {
      $scope.addToCart({
        'isbn': "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
        'title': "Henri Potier à l'école des sorciers",
        'price': 35,
        'cover': "http://henri-potier.xebia.fr/hp0.jpg"
      });

      expect(cartService.getCartSize()).toEqual(1);
    });
  });

  describe('$scope.goTo', function () {
    it('should go to the book page', inject(function ($httpBackend) {
      var isbn = 'c8fabf68-8374-48fe-a7ea-a00ccd07afff';
      $scope.goTo(isbn);
      expect($location.path).toHaveBeenCalledWith('/book/' + isbn);
    }));
  });
});
