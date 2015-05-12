var cartService = angular.module('cartService', ['ngResource']);

cartService.service('cartService', ['$rootScope', function ($rootScope) {


  function init () {
    $cart = {
      books: []
    };

    addBook("111", "Coucou", "12");
  };

  function addBook (isbn, name, price) {
    var newBook = {"isbn": isbn, "name": name, "price": price};
    this.$cart.books.push(newBook);
  };


}]);
