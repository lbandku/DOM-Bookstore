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
