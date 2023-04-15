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

retrieveFromLocalStorage();

addNewBook.addEventListener('click', showModal);
closeModalButton.addEventListener('click', closeModal);
bookForm.addEventListener('submit', addBookToLibrary);
