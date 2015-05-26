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

  it('should set getBookByIsbn function', function () {
    cartService.init();
    cartService.addBook(book1);
    cartService.addBook(book2);
    var expected = book1;
    var isbn = "c8fabf68-8374-48fe-a7ea-a00ccd07afff";
    expect(cartService.getBookByIsbn(isbn)).toEqual(expected);
  });

  it('should set addBook function', function () {
    cartService.init();
    cartService.addBook(book1);
    cartService.addBook(book2);
    expect(cartService.$cart.books.length).toEqual(2);
  });

  it('should set removeBook function', function () {
    cartService.init();
    cartService.addBook(book1);
    cartService.addBook(book2);
    cartService.removeBook(book2);
    expect(cartService.$cart.books.length).toEqual(1);
  });

  it('should set incrBook function', function () {
    cartService.init();
    cartService.addBook(book1);
    cartService.incrBook(book1);
    expect(cartService.$cart.books[0].quantity).toEqual(2);
  });

  it('should set decrBook function', function () {
    cartService.init();
    cartService.addBook(book1);
    cartService.addBook(book1);
    cartService.decrBook(book1);
    expect(cartService.$cart.books[0].quantity).toEqual(1);
  });

  it('should set getCart function', function () {
    cartService.init();
    var expected = [{
      'isbn': "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
      'title': "Henri Potier à l'école des sorciers",
      'price': 35,
      'cover': "http://henri-potier.xebia.fr/hp0.jpg",
      'quantity':1
    }, {
      "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
      "title": "Henri Potier et la Chambre des secrets",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp1.jpg",
      'quantity':1
    }];
    cartService.addBook(book1);
    cartService.addBook(book2);
    expect(cartService.getCart()).toEqual(expected);
  });

  it('should set getCartSize function', function () {
    cartService.init();

    cartService.addBook(book1);
    cartService.addBook(book2);
    expect(cartService.getCartSize()).toEqual(2);
  });
});
