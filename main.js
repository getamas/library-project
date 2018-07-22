

const bookFormDOM = document.getElementById('new-book'),
      libraryDOM = document.getElementById('library'),
      bookTitleDOM = document.getElementById('book-title'),
      bookAuthorDOM = document.getElementById('book-author'),
      bookPagesDOM = document.getElementById('book-pages'),
      bookStatusDOM = document.getElementById('book-read');
      
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
        ${this.title} by ${this.author}, ${this.pages} pages, ${this.status ? 'read' : 'not read yet'}.
    `;

    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    bookElem.appendChild(removeBtn);
    libraryDOM.appendChild(bookElem);

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
    
    let book = new Book(ID, bookTitle, bookAuthor, bookPages, bookStatus);
    
    myLibrary.push(book);

    book.addBooktoUI();

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


// Event Listeners
bookFormDOM.addEventListener('submit', addBookToLibrary);
libraryDOM.addEventListener('click', removeBook);


