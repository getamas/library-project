

function Storage() {

}

Storage.prototype.getBooks = function() {
    let books;

    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
}

Storage.prototype.displayBooks = function() {
    const books = this.getBooks();

    books.forEach(book => {
        book = new Book(book.id, book.title, book.author, book.pages, book.status);

        book.addBooktoUI();
    });
}

Storage.prototype.addBook = function(book) {
    const books = this.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

Storage.prototype.removeBook = function(id) {
    const books = this.getBooks();

    books.forEach((book, i) => {
        if (book.id === id) {
            books.splice(i, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}

Storage.prototype.changeReadStatus = function(id) {
    const books = this.getBooks();

    books.forEach(book => {
        if (book.id === id) {
            book.status = !book.status
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}