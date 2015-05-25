describe('CartCtrl', function () {
  var $scope, $location, controller, cartService;
  var book1 = {
    'isbn': "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
    'title': "Henri Potier à l'école des sorciers",
    'price': 35,
    'cover': "http://henri-potier.xebia.fr/hp0.jpg"
  };
  var book2 = {
    "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
    "title": "Henri Potier et la Chambre des secrets",
    "price": 30,
    "cover": "http://henri-potier.xebia.fr/hp1.jpg"
  };
  var offer1 = {
    "type": "percentage",
    "value": 4,
    "total": 62.40
  };

  var offer2 = {
    "type": "minus",
    "value": 15,
    "total": 50
  };

  beforeEach(module('bibliothequeApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    $location = jasmine.createSpyObj('$location', ['path']);
    $scope = $rootScope.$new();
    controller = $controller('CartCtrl', {
      $scope: $scope,
      $location: $location
    });
    $scope.offers = [offer1, offer2];
  }));

  beforeEach(inject(function (_cartService_) {
    cartService = _cartService_;
    cartService.init();
    cartService.addBook(book1);
    cartService.addBook(book2);
    $scope.cart = cartService.getCart();
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

  // //Unable to perform this test at the moment...
  //it('should get offers from http://henri-potier.xebia.fr/books/{isbn}/commercialOffers on $http', inject(function ($httpBackend) {
  //  $httpBackend.expectGET("http://henri-potier.xebia.fr/books/" + $scope.isbnList() + "/commercialOffers").respond();
  //  $httpBackend.flush();
  //}));

  describe('getTotalCart', function () {
    it('should calculate the total amount of the cart', function () {
      expect($scope.getTotalCart()).toEqual(65);
    });
  });

  describe('getTotalOffer', function () {
    it('should calculate the total amount of the cart for a specific offer', function () {
      var offer = {
        "type": "minus",
        "value": 15
      };
      $scope.getTotalOffer(offer);
      expect(offer.total).toEqual("50.00");
    });
  });

  describe('$scope.isbnList', function () {
    it('should give the isbn list', function () {
      expect($scope.isbnList()).toEqual('c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861');
    });
  });

  describe('$scope.deleteFromCart', function () {
    it('should remove a book from the cart', function () {
      $scope.deleteFromCart(book1);
      expect($scope.cart.length).toEqual(1);
    });
  });

  describe('$scope.incrQtity', function () {
    it('should increment one book quantity', function () {
      $scope.incrQtity(book2);
      expect($scope.cart[1].quantity).toEqual(2);
    });
  });

  describe('$scope.decrQtity', function () {
    it('should decrement one book quantity', function () {
      $scope.cart[1].quantity = 2;
      $scope.decrQtity(book2);
      expect($scope.cart[1].quantity).toEqual(1);
    });
  });

  describe('$scope.chooseBestOffer', function () {
    it('should say if one offer is the best', function () {
      $scope.chooseBestOffer(offer1);
      expect($scope.offers[0].best).toEqual(false);
      expect($scope.offers[1].best).toEqual(true);
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
