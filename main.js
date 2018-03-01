
const bookForm = document.getElementById('book-form');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(e) {
    e.preventDefault();
    
    const title = document.getElementById('book-title').value,
          author = document.getElementById('book-author').value,
          pages = document.getElementById('book-pages').value,
          read = document.getElementById('book-status').value;

    let book = new Book(title, author, Number(pages), read);
    myLibrary.push(book);
    addBookToUI(book, myLibrary.length);

    bookForm.reset();
}

function addBookToUI(book, index) {
    let bookList = document.querySelector('#book-list .collection');

    let li = document.createElement('li');
    li.className = 'collection-item';
    li.dataset.index = index;
    li.innerHTML = `
        <div class="book-info">
            <h3 class="book-cover">${book.title} by ${book.author}</h3>
        </div>

        <div class="book-info">
            <span class="book-pages">${book.pages} pages</span>
            <span class="book-status ${book.read === "false" ? "red" : "green"}">${book.read === "false" ? "Not Read" : "Read"}</span>
            <a class="remove" href="#"><i class="fa fa-times-circle icon"></i></a>
        <div>
    `;
    bookList.appendChild(li);
}

// Event Listeners
bookForm.addEventListener('submit', addBookToLibrary);