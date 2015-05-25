'use strict';

describe('cartService', function () {
  var cartService;

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

  beforeEach(module('bibliothequeApp'));

  beforeEach(inject(function (_cartService_) {
    cartService = _cartService_;
  }));

  it('should set init function', function () {
    cartService.init();
    var expected = {
      books: []
    };
    expect(cartService.$cart).toBeDefined();
    expect(cartService.$cart).toEqual(expected);
  });
});
