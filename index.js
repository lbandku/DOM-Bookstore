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
      bookList.innerHTML = ''; // Clear previous entries

      data.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (${book.year})`;
        bookList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error loading books:', error);
    });
}

// Handle book form submission (POST request)
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const year = parseInt(document.getElementById('year').value.trim(), 10);

  if (title && author && year) {
    const newBook = { title, author, year };

    fetch('https://bookstore-api-six.vercel.app/api/books', {
      method: 'POST',
      body: JSON.stringify(newBook),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add book');
        }
        return response.json();
      })
      .then(addedBook => {
        console.log('Book added:', addedBook);
        loadBooks(); // Refresh inventory list
        e.target.reset(); // Clear form
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  }
});

// Load books on initial page load
window.addEventListener('DOMContentLoaded', loadBooks);


