document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const year = document.getElementById('year').value.trim();

  if (title && author && year) {
    const bookList = document.getElementById('book-list');
    const li = document.createElement('li');
    li.textContent = `${title} by ${author} (${year})`;
    bookList.appendChild(li);

    // Clear form
    this.reset();
  }
});


// Fetch and display books from the API
function loadBooks() {
  fetch('https://bookstore-api-six.vercel.app/api/books')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = ''; // Clear any existing items

      data.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (${book.year})`;
        bookList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
}

// Call loadBooks on page load
window.addEventListener('DOMContentLoaded', loadBooks);


