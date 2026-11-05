const express = require('express');
const lab01App = require('../lab-01/server.js');
const lab03App = require('../lab-03/server.js');

const app = express();

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
  });
  next();
});

// Root route: API directory & quick links
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Backend Development Fundamentals - API Hub',
    student: 'Pavan Kumar Reddy Kuncha',
    endpoints: {
      lab01: {
        about: '/about',
        time: '/time'
      },
      lab03: {
        books: '/books',
        booksWithQuery: '/books?search_q=Clean&order_by=price&order=ASC',
        bookById: '/books/1'
      }
    }
  });
});

// Mount lab03 and lab01 — pass full path through so their routes match correctly
app.use(lab03App);
app.use(lab01App);

module.exports = app;
