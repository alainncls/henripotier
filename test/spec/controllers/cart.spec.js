describe('CartCtrl', function () {
  var $scope, $location, controller, cartService;

  beforeEach(module('bibliothequeApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    $location = jasmine.createSpyObj('$location', ['path']);
    $scope = $rootScope.$new();
    controller = $controller('CartCtrl', {
      $scope: $scope,
      $location: $location
    });
  }));

  beforeEach(inject(function (_cartService_) {
    cartService = _cartService_;
    cartService.init();
    cartService.addBook({
      'isbn': "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
      'title': "Henri Potier à l'école des sorciers",
      'price': 35,
      'cover': "http://henri-potier.xebia.fr/hp0.jpg",
      'quantity': 2
    });
    cartService.addBook({
      "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
      "title": "Henri Potier et la Chambre des secrets",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp1.jpg",
      'quantity': 1
    });
  }));

  it('should contain a cartService', function () {
    expect(cartService).toBeDefined();
  });

  it('should set cart var', function () {
    expect($scope.cart).toBeDefined();
  });

  it('should set offers var', function () {
    expect($scope.offers).toBeDefined();
  });

  it('should set isbnList function', function () {
    expect($scope.isbnList).toBeDefined();
  });

  it('should set getTotalCart function', function () {
    expect($scope.getTotalCart).toBeDefined();
  });

  it('should set getTotalOffer function', function () {
    expect($scope.getTotalOffer).toBeDefined();
  });

  it('should set calculateOffers function', function () {
    expect($scope.calculateOffers).toBeDefined();
  });

  it('should set $scope.deleteFromCart function', function () {
    expect($scope.deleteFromCart).toBeDefined();
  });

  it('should set incrQtity function', function () {
    expect($scope.incrQtity).toBeDefined();
  });

  it('should set decrQtity function', function () {
    expect($scope.decrQtity).toBeDefined();
  });

  it('should set chooseBestOffer function', function () {
    expect($scope.chooseBestOffer).toBeDefined();
  });

  // Unable to perform this test at the moment...
  //it('should get offers from http://henri-potier.xebia.fr/books/{isbn}/commercialOffers on $http', inject(function ($httpBackend) {
  //  cartService.addBook({
  //    'isbn': "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
  //    'title': "Henri Potier à l'école des sorciers",
  //    'price': 35,
  //    'cover': "http://henri-potier.xebia.fr/hp0.jpg"
  //  });
  //  cartService.addBook({
  //    "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
  //    "title": "Henri Potier et la Chambre des secrets",
  //    "price": 30,
  //    "cover": "http://henri-potier.xebia.fr/hp1.jpg"
  //  });
  //
  //  $scope.cart = cartService.getCart();
  //
  //  var isbn = $scope.isbnList();
  //
  //  $httpBackend.expectGET("http://henri-potier.xebia.fr/books/" + isbn + "/commercialOffers").respond();
  //  $httpBackend.flush();
  //}));

  //describe('getTotalCart', function () {
  //  it('should calculate the total amount of the cart', function () {
  //    expect($scope.getTotalCart()).toEqual(100);
  //  });
  //});

  //describe('getTotalOffer', function () {
  //  it('should calculate the total amount of the cart for a specific offer', function () {
  //    var offer = {
  //      "type": "minus",
  //      "value": 15
  //    };
  //    expect($scope.getTotalOffer(offer.total)).toEqual(85);
  //  });
  //});

  //describe('calculateOffers', function () {
  //  it('should calculate the total amount of the cart for a specific offer', function () {
  //    var offer = {
  //      "type": "minus",
  //      "value": 15
  //    };
  //    expect($scope.calculateOffers()).toEqual(true);
  //  });
  //});

  describe('$scope.goTo', function () {
    it('should go to the book page', inject(function ($httpBackend) {
      var isbn = 'c8fabf68-8374-48fe-a7ea-a00ccd07afff';
      $scope.goTo(isbn);
      expect($location.path).toHaveBeenCalledWith('/book/' + isbn);
    }));
  });
});
