'use strict';

angular.module('bibliothequeApp')
  .service('cartService', [function () {
    this.init = function () {
      this.$cart = {
        books: []
      };
    };

    this.getBookByIsbn = function (isbn) {
      var book = null;
      angular.forEach(this.$cart.books, function (b) {
        if (b.isbn === isbn) {
          book = b;
        }
      });
      return book;
    };

    this.addBook = function (book) {
      if (this.getBookByIsbn(book.isbn) !== null) {
        book.quantity++;
      }
      else {
        book.quantity = 1;
        this.$cart.books.push(book);
      }
    };

    this.removeBook = function (book) {
      this.$cart.books.splice(book, 1);
    };

    this.incrBook = function (book) {
      this.getBookByIsbn(book.isbn).quantity++;
    };

    this.decrBook = function (book) {
      this.getBookByIsbn(book.isbn).quantity--;
    };

    this.getCart = function () {
      return this.$cart.books;
    };

    this.getCartSize = function () {
      var qtity = 0;
      angular.forEach(this.$cart.books, function (b) {
        qtity += b.quantity;
      });
      return qtity;
    };
  }]);
