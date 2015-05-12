angular.module('bibliothequeApp')
  .service('cartService', ['$rootScope', function ($rootScope) {
    this.init = function () {
      this.$cart = {
        books: []
      };
    };

    this.getBookByIsbn = function (isbn) {
      var book = null;
      angular.forEach(this.$cart.books, function (item) {
        if (item.isbn === isbn) {
          book = item;
        }
      });
      return book;
    }

    this.addBook = function (book) {
      if (this.getBookByIsbn(book.isbn) != null) {
      }
      else {
        this.$cart.books.push(book);
      }
    };

    this.getCart = function () {
      return this.$cart.books;
    };
  }]);
