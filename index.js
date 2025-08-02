// Fetch and display books from API
function loadBooks() {
  fetch('https://bookstore-api-six.vercel.app/api/books')
    .then(response => {
      if (!response.ok) throw new Error('Network response not OK');
      return response.json();
    })
    .then(data => {
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = '';

      if (Array.isArray(data) && data.length > 0) {
        data.forEach(book => {
          appendBookToList(book);
        });
      } else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', '3');
        td.textContent = 'No books found.';
        tr.appendChild(td);
        bookList.appendChild(tr);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = '';
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.setAttribute('colspan', '3');
      td.textContent = 'Failed to load books.';
      tr.appendChild(td);
      bookList.appendChild(tr);
    });
}

// Append a book row to the bottom of the table (used when loading all books)
function appendBookToList(book) {
  const bookList = document.getElementById('book-list');

  const tr = document.createElement('tr');

  const tdTitle = document.createElement('td');
  tdTitle.textContent = book.title;
  tr.appendChild(tdTitle);

  const tdAuthor = document.createElement('td');
  tdAuthor.textContent = book.author;
  tr.appendChild(tdAuthor);

  const tdPublisher = document.createElement('td');
  tdPublisher.textContent = book.publisher || 'N/A';
  tr.appendChild(tdPublisher);

  bookList.appendChild(tr);
}

// Prepend a book row to the top of the table (used when adding a new book)
function prependBookToList(book) {
  const bookList = document.getElementById('book-list');

  const tr = document.createElement('tr');

  const tdTitle = document.createElement('td');
  tdTitle.textContent = book.title;
  tr.appendChild(tdTitle);

  const tdAuthor = document.createElement('td');
  tdAuthor.textContent = book.author;
  tr.appendChild(tdAuthor);

  const tdPublisher = document.createElement('td');
  tdPublisher.textContent = book.publisher || 'N/A';
  tr.appendChild(tdPublisher);

  if (bookList.firstChild) {
    bookList.insertBefore(tr, bookList.firstChild);
  } else {
    bookList.appendChild(tr);
  }
}

// Handle form submission to POST new book
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
        if (!response.ok) throw new Error('Failed to add book');
        return response.json();
      })
      .then(addedBook => {
        console.log('Book added:', addedBook);
        prependBookToList(addedBook);
        e.target.reset();
      })
      .catch(error => {
        console.error('Error adding book:', error);
        alert('Failed to add book. Please try again.');
      });
  } else {
    alert('Please fill in all fields.');
  }
});

// Load books when page loads
window.addEventListener('DOMContentLoaded', loadBooks);
