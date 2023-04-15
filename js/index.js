const addNewBook = document.querySelector('#add-book');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal-close');
const bookForm = document.querySelector('.modal-content');
const titleInput = document.querySelector('input[placeholder="Title"]');
const authorInput = document.querySelector('input[placeholder="Author"]');
const isReadInput = document.querySelector('#read');
const bookContainer = document.querySelector('.book-container');

let books = [];

function showModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
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
  books.forEach((book, index) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.dataset.index = index;
    bookElement.innerHTML = `
      <p>Title: <span class="title">${book.title}</span></p>
      <p>Author: <span class="author">${book.author}</span></p>
      <button class="read">${book.isRead ? 'Read' : 'Unread'}</button>
      <button class="remove">Remove</button>
    `;
    bookContainer.appendChild(bookElement);
  });
}

retrieveFromLocalStorage();

addNewBook.addEventListener('click', showModal);
closeModalButton.addEventListener('click', closeModal);
bookForm.addEventListener('submit', addBookToLibrary);
