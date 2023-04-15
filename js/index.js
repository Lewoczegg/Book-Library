const addNewBook = document.querySelector('#add-book');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal-close');
const bookForm = document.querySelector('.modal-content');
const titleInput = document.querySelector('input[placeholder="Title"]');
const authorInput = document.querySelector('input[placeholder="Author"]');
const isReadInput = document.querySelector('#read');
const bookContainer = document.querySelector('.book-container');
const menuButton = document.querySelector('#menu-button');
const menu = document.querySelector('.menu');
const sortByTitleAscButton = document.getElementById('sort-titile-asc');
const sortByTitleDescButton = document.getElementById('sort-titile-desc');
const sortByAuthorAscButton = document.getElementById('sort-author-asc');
const sortByAuthorDescButton = document.getElementById('sort-author-desc');

let books = [];

function showModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function toggleMenu() {
  menu.classList.toggle('toggle');
}

function addBookToLibrary(event) {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const isRead = isReadInput.checked;
  const book = { title, author, isRead };
  books.push(book);
  saveToLocalStorage();
  renderBooks();
  closeModal();
  bookForm.reset();
}

function saveToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function retrieveFromLocalStorage() {
  const storedBooks = JSON.parse(localStorage.getItem('books'));
  if (storedBooks) {
    books = storedBooks;
    renderBooks();
  }
}

function renderBooks() {
  bookContainer.innerHTML = '';
  books.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
      <p>Title: <span class="title">${book.title}</span></p>
      <p>Author: <span class="author">${book.author}</span></p>
    `;

    const readButton = document.createElement('button');
    readButton.classList.add('read');
    if (book.isRead) {
      readButton.textContent = 'Read';
    } else {
      readButton.textContent = 'Unread';
      readButton.style.backgroundColor = '#db4d4d';
    }
    readButton.addEventListener('click', () => {
      if (book.isRead) {
        book.isRead = false;
        readButton.textContent = 'Unread';
        readButton.style.backgroundColor = '#db4d4d';
      } else {
        book.isRead = true;
        readButton.textContent = 'Read';
        readButton.style.backgroundColor = '#90db53';
      }
      localStorage.setItem('books', JSON.stringify(books));
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    removeButton.addEventListener('click', () => {
      const parent = removeButton.parentElement;
      const bookIndex = Array.from(parent.parentNode.children).indexOf(parent);
      books.splice(bookIndex, 1);
      localStorage.setItem('books', JSON.stringify(books));
      parent.remove();
    });

    bookElement.append(readButton);
    bookElement.appendChild(removeButton);

    bookContainer.appendChild(bookElement);
  });
}

function sortBooks(sortBy, sortOrder) {
  books.sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
  });
  renderBooks();
}

retrieveFromLocalStorage();

addNewBook.addEventListener('click', showModal);
closeModalButton.addEventListener('click', closeModal);
bookForm.addEventListener('submit', addBookToLibrary);
menuButton.addEventListener('click', toggleMenu);
sortByTitleAscButton.addEventListener('click', () => {
  sortBooks('title', 'asc');
  sortByTitleAscButton.style.backgroundColor = '#90db53';
  sortByTitleDescButton.style.backgroundColor = '#eeeeee';
  sortByAuthorAscButton.style.backgroundColor = '#eeeeee';
  sortByAuthorDescButton.style.backgroundColor = '#eeeeee';
});
sortByTitleDescButton.addEventListener('click', () => {
  sortBooks('title', 'desc');
  sortByTitleAscButton.style.backgroundColor = '#eeeeee';
  sortByTitleDescButton.style.backgroundColor = '#90db53';
  sortByAuthorAscButton.style.backgroundColor = '#eeeeee';
  sortByAuthorDescButton.style.backgroundColor = '#eeeeee';
});
sortByAuthorAscButton.addEventListener('click', () => {
  sortBooks('author', 'asc');
  sortByTitleAscButton.style.backgroundColor = '#eeeeee';
  sortByTitleDescButton.style.backgroundColor = '#eeeeee';
  sortByAuthorAscButton.style.backgroundColor = '#90db53';
  sortByAuthorDescButton.style.backgroundColor = '#eeeeee';
});
sortByAuthorDescButton.addEventListener('click', () => {
  sortBooks('author', 'desc');
  sortByTitleAscButton.style.backgroundColor = '#eeeeee';
  sortByTitleDescButton.style.backgroundColor = '#eeeeee';
  sortByAuthorAscButton.style.backgroundColor = '#eeeeee';
  sortByAuthorDescButton.style.backgroundColor = '#90db53';
});
