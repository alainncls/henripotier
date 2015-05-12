angular.module('bibliothequeApp')
  .service('cartService', ['$rootScope', function ($rootScope) {
    this.init = function () {
      this.$cart = {
        books: []
      };
    };

    this.addBook = function (book) {
      this.$cart.books.push(book);
    };

    this.getCart = function () {
      return this.$cart.books;
    };
  }]);
