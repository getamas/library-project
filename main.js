
const bookForm = document.getElementById('book-form');
let bookList = document.querySelector('#book-list .collection');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeReadStatus = function() {
    return this.read = !this.read;
}

function addBookToLibrary(e) {
    e.preventDefault();
    
    const title = document.getElementById('book-title').value,
          author = document.getElementById('book-author').value,
          pages = document.getElementById('book-pages').value,
          read = document.getElementById('book-status').value;

    let book = new Book(title, author, Number(pages), read === 'read' ? true : false);
    myLibrary.push(book);
    addBookToUI(book, myLibrary.length);

    bookForm.reset();
}

function addBookToUI(book, index) {

    let li = document.createElement('li');
    li.className = 'collection-item';
    li.dataset.index = index - 1;
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

function changeReadStatus(e) {
    // Toogle read status
    if (e.target.classList.contains('book-status')) {
        if (e.target.textContent === 'Read') {
            e.target.textContent = 'Not Read';
            e.target.classList.remove('green');
            e.target.classList.add('red');

            myLibrary.forEach((book, index) => {
                if (index === Number(e.target.parentElement.parentElement.dataset.index)) {
                    book.changeReadStatus();
                }
            });
        } else {
            e.target.textContent = 'Read';
            e.target.classList.remove('red');
            e.target.classList.add('green');

            myLibrary.forEach((book, index) => {
                if (index === Number(e.target.parentElement.parentElement.dataset.index)) {
                    book.changeReadStatus();
                }
            });
        }
    }
}

function removeItem(e) {
    console.log(e.target);
}

// Event Listeners
bookForm.addEventListener('submit', addBookToLibrary);
bookList.addEventListener('click', function() {
    removeItem(event);
    changeReadStatus(event);
});