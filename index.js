// Fetch and Display Books from API //

function loadBooks() {
  fetch('https://bookstore-api-six.vercel.app/api/books')
    .then(response => {
      if (!response.ok) throw new Error('Network response not OK');
      return response.json();
    })
    .then(data => {
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = ''; // Clear existing rows //

      if (Array.isArray(data) && data.length > 0) {
        data.forEach(book => appendBookToList(book));
      } else {
        displayMessageRow('No books found.');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      displayMessageRow('Failed to load books.');
    });
}

// Display a message row in the table //

function displayMessageRow(message) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.setAttribute('colspan', '4');
  td.style.textAlign = 'center';
  td.textContent = message;

  tr.appendChild(td);
  bookList.appendChild(tr);
}

// Create Delete Button for Book Row //

function createDeleteButton(bookId, rowElement) {
  const btn = document.createElement('button');
  btn.textContent = 'Delete';

  btn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this book?')) {
      fetch(`https://bookstore-api-six.vercel.app/api/books/${bookId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete book');
          rowElement.remove(); // Remove row from table
        })
        .catch(error => {
          console.error('Error deleting book:', error);
          alert('Failed to delete the book. Please try again.');
        });
    }
  });

  return btn;
}

// Create and Append Book Row //

function appendBookToList(book) {
  const bookList = document.getElementById('book-list');
  bookList.appendChild(createBookRow(book));
}

// Create and Prepend a Book Row (for New Book) //

function prependBookToList(book) {
  const bookList = document.getElementById('book-list');
  const row = createBookRow(book);

  bookList.insertBefore(row, bookList.firstChild);
}

// Build Table Row HTML Element for a Book //

function createBookRow(book) {
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

  const tdActions = document.createElement('td');
  tdActions.appendChild(createDeleteButton(book.id, tr));
  tr.appendChild(tdActions);

  return tr;
}

// Handle Form Submission -- POST New Book //

document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Read form values
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const publisher = document.getElementById('publisher').value.trim();

  if (title && author && publisher) {
    const newBook = { title, author, publisher };

    // Send POST request to API //
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
        prependBookToList(addedBook); // Add to top of table //
        e.target.reset();             // Clear (reset) form //
      })
      .catch(error => {
        console.error('Error adding book:', error);
        alert('Failed to add book. Please try again.');
      });
  } else {
    alert('Please fill in all fields.');
  }
});

// Initialize: Load Books on Page Load //

window.addEventListener('DOMContentLoaded', loadBooks);

// Typewriter Tagline Effect //

new TypeIt("#simpleUsage2", {
  strings: "~ A Novel Way to Recycle ~",
  speed: 80,
  waitUntilVisible: true,
}).go();


