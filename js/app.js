
// DOM elements
const bookFormDOM = document.getElementById('new-book'),
      libraryDOM = document.getElementById('library'),
      bookTitleDOM = document.getElementById('book-title'),
      bookAuthorDOM = document.getElementById('book-author'),
      bookPagesDOM = document.getElementById('book-pages'),
      bookStatusDOM = document.getElementById('book-read');
   
// My Library
let myLibrary = [];


// Book Constructor
function Book(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// Add book to UI 
Book.prototype.addBooktoUI = function() {

    let bookElem = document.createElement('li');
    bookElem.dataset.id = this.id;
    bookElem.textContent = `
        ${this.title} by ${this.author}, ${this.pages} pages.
    `;

    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    let statusBtn = document.createElement('button');
    statusBtn.textContent = this.status ? 'Read' : 'Not Read';
    statusBtn.className = 'status-btn';

    bookElem.appendChild(removeBtn);
    bookElem.appendChild(statusBtn);
    libraryDOM.appendChild(bookElem);

}

// Change read status
Book.prototype.changeStatus = function() {
    return this.status = !this.status
}


// Add book to Library
function addBookToLibrary(event) {

    event.preventDefault();

    let ID,
        bookTitle = bookTitleDOM.value,
        bookAuthor = bookAuthorDOM.value,
        bookPages = parseInt(bookPagesDOM.value),
        bookStatus = bookStatusDOM.value === 'true' ? true : false;

    if (myLibrary.length > 0) {
        ID = myLibrary[myLibrary.length - 1].id + 1;
    } else {
        ID = 0;
    }
    
    // 1. Create a new book instance
    let book = new Book(ID, bookTitle, bookAuthor, bookPages, bookStatus);
    
    // 2. Add book to the data structure
    myLibrary.push(book);

    // 3. Add book to the UI
    book.addBooktoUI();

    // 4. Add book to localStorage
    storage.addBook(book);

    // 5. Clear form fields
    bookFormDOM.reset();
}


// Remove book from Library, UI
function removeBook(event) {
    let id, ids, index;

    if (event.target.className === 'remove-btn') {

        id = parseInt(event.target.parentNode.dataset.id);

        ids = myLibrary.map(current => {
            return current.id;
        });

        index = ids.indexOf(id);

        myLibrary.splice(index, 1);

        event.target.parentNode.remove();
    }

}

// Toggle read status
function toggleReadStatus(event) {
    let id, index, book;

    if (event.target.classList.contains('status-btn')) {  

        id = parseInt(event.target.parentNode.dataset.id);

        myLibrary.forEach(curr => {
            if (curr.id === id) {
                book = curr;
            }
        });

        if (event.target.textContent === 'Read') {
            event.target.textContent = 'Not Read';
            book.changeStatus();
        } else {
            event.target.textContent = 'Read';
            book.changeStatus();
        }

    }

}

// Event Listeners
bookFormDOM.addEventListener('submit', addBookToLibrary);
libraryDOM.addEventListener('click', removeBook);
libraryDOM.addEventListener('click', toggleReadStatus)


// Init Application
// function init() {
//     console.log('Application has started');
//     storage.displayBooks();
// }

// document.addEventListener('DOMContentLoaded', init);