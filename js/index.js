const addNewBook = document.querySelector('#add-book');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal-close');

function showModal() {
  modal.style.display = 'flex';
}
addNewBook.addEventListener('click', showModal);

function closeModal() {
  modal.style.display = 'none';
}
closeModalButton.addEventListener('click', closeModal);
// const addBookModal = document.getElementById('addBookModal');
// const addBookButton = document.getElementById('addBookButton');
// const addBookForm = document.getElementById('addBookForm');
// const addBookTitle = document.getElementById('title');
// const addBookAuthor = document.getElementById('author');
// const addBookYear = document.getElementById('year');
// const addBookClose = document.getElementsByClassName('close')[0];
// const addBookCancel = document.getElementsByClassName('cancel')[0];

// // Add event listeners for showing and hiding the add book modal
// addBookButton.addEventListener('click', () => addBookModal.style.display = 'block');
// addBookClose.addEventListener('click', () => addBookModal.style.display = 'none');
// addBookCancel.addEventListener('click', () => addBookModal.style.display = 'none');
// window.addEventListener('click', (event) => {
//   if (event.target == addBookModal) {
//     addBookModal.style.display = 'none';
//   }
// });

// // Define the addBook function
// function addBook(title, author, year) {
//   const book = {
//     title: title,
//     author: author,
//     year: year
//   };
