const express = require('express');
const lab01App = require('../lab-01/server.js');
const lab03App = require('../lab-03/server.js');

const app = express();

// Body parsing middleware
app.use(express.json());

// Root route: API directory & quick links
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Backend Development Fundamentals - API Hub',
    student: 'Pavan Kumar Reddy Kuncha',
    endpoints: {
      lab01: {
        root: '/lab-01',
        about: '/about',
        time: '/time'
      },
      lab03: {
        books: '/books',
        booksWithQuery: '/books?search_q=Clean&order_by=price&order=ASC',
        bookById: '/books/:id'
      }
    }
  });
});

// Route /books and sub-paths to lab03App (preserve /books path)
app.use('/books', (req, res, next) => {
  req.url = '/books' + (req.url === '/' ? '' : req.url);
  lab03App(req, res, next);
});
app.use('/lab-03', lab03App);

// Lab 1 routes accessible at root (/about, /time) and prefixed at /lab-01
app.use('/lab-01', lab01App);
app.use(lab01App);

module.exports = app;
