
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
        addBooktoUI(book);
    });
}

Storage.prototype.addBook = function(book) {
    const books = this.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}



