
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });

  next();
});

// Books data
let books = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', price: 45.99, genre: 'Technology' },
  { id: 2, title: 'Clean Code', author: 'Robert Martin', price: 39.99, genre: 'Technology' },
  { id: 3, title: 'Design Patterns', author: 'Gang of Four', price: 54.99, genre: 'Technology' },
  { id: 4, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', price: 29.99, genre: 'Technology' },
  { id: 5, title: 'You Don\'t Know JS', author: 'Kyle Simpson', price: 24.99, genre: 'Technology' }
];

let nextId = 6;

// Find a book using its ID
function findBook(id) {
  return books.find(book => book.id === parseInt(id, 10));
}

// Get all books with search, sorting, filtering and pagination
app.get('/books', (req, res) => {
  let {
    search_q = '',
    order_by = 'id',
    order = 'ASC',
    limit = '10',
    offset = '0',
    min_price,
    max_price
  } = req.query;

  const allowedColumns = ['id', 'title', 'author', 'price', 'genre'];

  if (!allowedColumns.includes(order_by)) {
    return res.status(400).json({
      message: `Invalid order_by value. Allowed: ${allowedColumns.join(', ')}`
    });
  }

  order = order.toUpperCase();

  if (!['ASC', 'DESC'].includes(order)) {
    return res.status(400).json({
      message: 'Invalid order value. Must be ASC or DESC.'
    });
  }

  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);

  if (isNaN(limit) || limit < 0) {
    return res.status(400).json({
      message: 'limit must be a non-negative integer.'
    });
  }

  if (isNaN(offset) || offset < 0) {
    return res.status(400).json({
      message: 'offset must be a non-negative integer.'
    });
  }

  let minP = min_price !== undefined ? parseFloat(min_price) : null;
  let maxP = max_price !== undefined ? parseFloat(max_price) : null;

  if (min_price !== undefined && isNaN(minP)) {
    return res.status(400).json({
      message: 'min_price must be a number.'
    });
  }

  if (max_price !== undefined && isNaN(maxP)) {
    return res.status(400).json({
      message: 'max_price must be a number.'
    });
  }

  // Search and filter books
  let result = books.filter(book => {
    if (search_q && !book.title.toLowerCase().includes(search_q.toLowerCase())) {
      return false;
    }

    if (minP !== null && book.price < minP) {
      return false;
    }

    if (maxP !== null && book.price > maxP) {
      return false;
    }

    return true;
  });

  // Sort books
  result.sort((a, b) => {
    if (a[order_by] < b[order_by]) {
      return order === 'ASC' ? -1 : 1;
    }

    if (a[order_by] > b[order_by]) {
      return order === 'ASC' ? 1 : -1;
    }

    return 0;
  });

  // Apply pagination
  const total = result.length;
  const paged = result.slice(offset, offset + limit);

  res.status(200).json({
    total,
    limit,
    offset,
    count: paged.length,
    books: paged
  });
});

// Get a single book by ID
app.get('/books/:id', (req, res) => {
  const book = findBook(req.params.id);

  if (!book) {
    return res.status(404).json({
      message: `Book with id ${req.params.id} not found.`
    });
  }

  res.status(200).json(book);
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author, price, genre } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('title is required and must be a non-empty string.');
  }

  if (!author || typeof author !== 'string' || author.trim() === '') {
    errors.push('author is required and must be a non-empty string.');
  }

  if (price === undefined || price === null) {
    errors.push('price is required.');
  } else if (typeof price !== 'number' || isNaN(price)) {
    errors.push('price must be a numeric value.');
  } else if (price < 0) {
    errors.push('price must be a non-negative number.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(' ')
    });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
    price,
    genre: genre ? genre.trim() : 'General'
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// Update an existing book
app.put('/books/:id', (req, res) => {
  const book = findBook(req.params.id);

  if (!book) {
    return res.status(404).json({
      message: `Book with id ${req.params.id} not found.`
    });
  }

  const { title, author, price, genre } = req.body;
  const errors = [];

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    errors.push('title must be a non-empty string.');
  }

  if (author !== undefined && (typeof author !== 'string' || author.trim() === '')) {
    errors.push('author must be a non-empty string.');
  }

  if (price !== undefined) {
    if (typeof price !== 'number' || isNaN(price)) {
      errors.push('price must be a numeric value.');
    } else if (price < 0) {
      errors.push('price must be a non-negative number.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(' ')
    });
  }

  if (title !== undefined) book.title = title.trim();
  if (author !== undefined) book.author = author.trim();
  if (price !== undefined) book.price = price;
  if (genre !== undefined) book.genre = genre.trim();

  res.status(200).json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(book => book.id === parseInt(req.params.id, 10));

  if (index === -1) {
    return res.status(404).json({
      message: `Book with id ${req.params.id} not found.`
    });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.status(200).json({
    message: `Book '${deletedBook.title}' deleted successfully.`
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({
    message: `Cannot ${req.method} ${req.originalUrl}. Route not found.`
  });
});

// Start the server
if (require.main === module && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Lab 03 REST API server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
