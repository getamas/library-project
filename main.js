
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(event) {
    // 'The Hobbit', 'J.R.R Tolkien', 297, false
    event.preventDefault();

    let bookTitle = document.getElementById('book-title').value,
        bookAuthor = document.getElementById('book-author').value,
        bookPages = document.getElementById('book-pages').value,
        bookRead = document.getElementById('book-read').value;
    
    return console.log(
        {
            title: bookTitle, 
            author: bookAuthor, 
            pages: parseInt(bookPages),
            read: bookRead === 'true' ? true : false
        });
}


// Display books on the page
function render() {
    const libraryDOM = document.querySelector('#library');

    myLibrary.forEach(book => {
        let bookElem = document.createElement('li');
        bookElem.textContent = `
            ${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? 'read' : 'not read yet'}.
        `;

        libraryDOM.appendChild(bookElem);
    });

}

// Event Listeners
document.querySelector('#new-book').addEventListener('submit', addBookToLibrary);



