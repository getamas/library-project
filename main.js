
const bookForm = document.getElementById('book-form');
let bookList = document.querySelector('#book-list .collection');
let myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeReadStatus = function() {
    return this.read = !this.read;
}

// DOM load event listener for localStorage
document.addEventListener('DOMContentLoaded', Storage.displayBooks);

// Add book to library
function addBookToLibrary(e) {
    e.preventDefault();
    
    const title = document.getElementById('book-title').value,
          author = document.getElementById('book-author').value,
          pages = document.getElementById('book-pages').value,
          read = document.getElementById('book-status').value;

    let book = new Book(title, author, Number(pages), read === 'read' ? true : false);
    myLibrary.push(book);
    addBookToUI(book, myLibrary.indexOf(book));

    Storage.addBook(book);

    bookForm.reset();
}

// Append book to UI
function addBookToUI(book, index) {
    let li = document.createElement('li');
    li.className = 'collection-item';
    book.id = index;
    li.dataset.id = index;
    li.innerHTML = `
        <div class="book-info">
            <h3 class="book-cover">${book.title} by ${book.author}</h3>
        </div>

        <div class="book-info">
            <span class="book-pages">${book.pages} pages</span>
            <span class="book-status ${book.read === false ? "red" : "green"}">${book.read === false ? "Not Read" : "Read"}</span>
            <i class="material-icons remove">clear</i>
        <div>
    `;
    bookList.appendChild(li);
}

// Change book read status
function changeReadStatus(target) {
    if (target.classList.contains('book-status')) {
        if (target.textContent === 'Read') {
            target.textContent = 'Not Read';
            target.classList.remove('green');
            target.classList.add('red');

            myLibrary.forEach((book, index) => {
                if (index === Number(target.parentElement.parentElement.dataset.index)) {
                    book.changeReadStatus();
                }
            });
        } else {
            target.textContent = 'Read';
            target.classList.remove('red');
            target.classList.add('green');

            myLibrary.forEach((book, index) => {
                if (index === Number(target.parentElement.parentElement.dataset.index)) {
                    book.changeReadStatus();
                }
            });
        }
    }
}

// Remove book
function removeItem(target) {
    if (target.classList.contains('remove')) {
        target.parentElement.parentElement.remove();

        Storage.removeBook(Number(target.parentElement.parentElement.dataset.id));
    }
}

// Event Listeners
bookForm.addEventListener('submit', addBookToLibrary);
bookList.addEventListener('click', function(e) {
    removeItem(e.target);
    changeReadStatus(e.target);
});