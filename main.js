
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let book1 = new Book('The Hobbit', 'J.R.R Tolkien', 297, false);
    let book2 = new Book('Brave New World', 'A. Huxley', 200, true);


    myLibrary.push(book1);
    myLibrary.push(book2);
    console.log(myLibrary);
}

addBookToLibrary();

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

render();



