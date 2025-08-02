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
  const publisher = document.getElementById('publisher').value.trim();

  if (title && author && publisher) {
    const newBook = { title, author, publisher };

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
        loadBooks(); // Reload list from API
        e.target.reset(); // Clear form
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  }
});

// Load books on initial page load
window.addEventListener('DOMContentLoaded', loadBooks);

function loadBooks() {
  fetch('https://bookstore-api-six.vercel.app/api/books')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return response.json();
    })
    .then(data => {
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = '';

      if (Array.isArray(data) && data.length > 0) {
        data.forEach(book => {
          const li = document.createElement('li');
          li.textContent = `${book.title} by ${book.author} (Publisher: ${book.publisher || 'N/A'})`;
          bookList.appendChild(li);
        });
      } else {
        bookList.innerHTML = '<li>No books found.</li>';
      }
    })
    .catch(error => {
      console.error('Error loading books:', error);
      document.getElementById('book-list').innerHTML = '<li>Failed to load books.</li>';
    });
}
