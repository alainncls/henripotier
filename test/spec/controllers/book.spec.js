describe('BookCtrl', function () {
  var $scope, $location, controller, cartService;

  beforeEach(module('bibliothequeApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('BookCtrl', {
      $scope: $scope
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

  it('should set book var', function () {
    expect($scope.book).toBeDefined();
  });

  it('should set findRequestedBook() function', function () {
    expect($scope.findRequestedBook).toBeDefined();
  });

  it('should set addToCart() function', function () {
    expect($scope.addToCart).toBeDefined();
  });

  it('should get books from http://henri-potier.xebia.fr/books on $http', inject(function ($httpBackend) {
    $httpBackend.expectGET('http://henri-potier.xebia.fr/books').respond();
    $httpBackend.flush();
  }));

  describe('$scope.findRequestedBook', function () {
    it('should find a book by isbn', function () {
      cartService.addBook({
        'isbn': "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
        'title': "Henri Potier à l'école des sorciers",
        'price': 35,
        'cover': "http://henri-potier.xebia.fr/hp0.jpg"
      });

      cartService.addBook({
        "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
        "title": "Henri Potier et la Chambre des secrets",
        "price": 30,
        "cover": "http://henri-potier.xebia.fr/hp1.jpg"
      });

      expect($scope.findRequestedBook('c8fabf68-8374-48fe-a7ea-a00ccd07afff')).toEqual({
        'isbn': "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
        'title': "Henri Potier à l'école des sorciers",
        'price': 35,
        'cover': "http://henri-potier.xebia.fr/hp0.jpg"
      });
    });
  });

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
});
