
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

    myLibrary.push(new Book(title, author, Number(pages), Boolean(read)));

    bookForm.reset();
}

function render() {
    let bookList = document.querySelector('#book-list .collection');
    myLibrary.forEach((book, index) => {
        let li = document.createElement('li');
        li.className = 'collection-item';
        li.dataset.index = index;
        li.innerHTML = `
            <div class="book-info">
                <h3 class="book-cover">${book.title} by ${book.author}</h3>
            </div>

            <div class="book-info">
                <span class="book-pages">${book.pages} pages</span>
                <span class="book-status">${book.read === false ? "Not Read" : "Read"}</span>
            <div>
        `;
        bookList.appendChild(li);
    });
}

// Event Listeners
bookForm.addEventListener('submit', () => {
    addBookToLibrary(event);
    render();
});