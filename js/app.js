
// DOM elements
const bookFormDOM = document.getElementById('new-book'),
      libraryDOM = document.getElementById('library'),
      bookTitleDOM = document.getElementById('book-title'),
      bookAuthorDOM = document.getElementById('book-author'),
      bookPagesDOM = document.getElementById('book-pages'),
      bookStatusDOM = document.getElementById('book-read');
   
// My Library
let myLibrary = [];

// Init localStorage
let storage = new Storage();


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
    bookElem.className = 'book';
    bookElem.dataset.id = this.id;
    bookElem.innerHTML = `
        <h3 class="book-title">${this.title}</h3>
        <p class="book-author">by ${this.author}</p>
        <span class="book-pages">${this.pages} pages</span>
    `;

    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = `<i class="fas fa-window-close"></i>`;

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

    if (event.target.parentNode.className === 'remove-btn') {

        id = parseInt(event.target.parentNode.parentNode.dataset.id);

        ids = myLibrary.map(current => {
            return current.id;
        });

        index = ids.indexOf(id);

        // 1. Remove book from the data structure
        myLibrary.splice(index, 1);

        // 2. Remove book from the UI
        event.target.parentNode.parentNode.remove();

        // 3. Remove book from localStorage
        storage.removeBook(id);
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

            storage.changeReadStatus(id);
        } else {
            event.target.textContent = 'Read';
            book.changeStatus();

            storage.changeReadStatus(id);
        }

    }

}

// Event Listeners
bookFormDOM.addEventListener('submit', addBookToLibrary);
libraryDOM.addEventListener('click', removeBook);
libraryDOM.addEventListener('click', toggleReadStatus)


// Init Application
function init() {
    console.log('Application has started');

    // 1. Display books on the UI from localStorage
    storage.displayBooks();

    // 2. Init data structure from localStorage
    const books = storage.getBooks();

    books.forEach(book => {
        book = new Book(book.id, book.title, book.author, book.pages, book.status);

        myLibrary.push(book);
    });
}

document.addEventListener('DOMContentLoaded', init);