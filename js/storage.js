// class Storage {
//     static getBooks() {
//         let books;
//         if (localStorage.getItem('books') === null) {
//             books = [];
//         } else {
//             books = JSON.parse(localStorage.getItem('books'));
//         }

//         return books;
//     }

//     static displayBooks() {
//         const books = Storage.getBooks();

//         books.forEach(function(book) {
//             addBookToUI(book);
//         });
//     }

//     static addBook(book) {
//         const books = Storage.getBooks();

//         books.push(book);

//         localStorage.setItem('books', JSON.stringify(books));
//     }

//     static removeBook(id) {
//         const books = Storage.getBooks();

//         books.forEach(function(book, index) {
//             if (book.id === id) {
//                 books.splice(index, 1);
//             }
//         });

//         localStorage.setItem('books', JSON.stringify(books));
//     }

//     static changeBookReadStatus() {
//         const books = Storage.getBooks();
//     }
// }

var storage = {
    getBooks: function() {
        let books;

        if (localStorage.getItem(books) === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem(books));
        }

        return books;
    },

    // displayBooks: function() {
    //     const books = storage.getBooks();

    //     books.forEach(book => {
    //         book.addBookUI();
    //     });
    // },

    addBook: function(book) {
        const books = storage.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
}