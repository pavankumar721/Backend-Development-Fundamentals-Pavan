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

// Middleware to restore actual route when Vercel rewrites to /api/index.js
app.use((req, res, next) => {
  const original = req.headers['x-matched-path'] || req.headers['x-now-route-matches'];
  if (original && !original.startsWith('/api/index.js')) {
    req.url = original;
  } else if (req.url.startsWith('/api/index.js')) {
    const rawQuery = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    req.url = '/' + rawQuery;
  }
  next();
});

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

// Mount lab03 routes (/books, /lab-03)
app.use('/books', (req, res, next) => {
  req.url = '/books' + (req.url === '/' ? '' : req.url);
  lab03App(req, res, next);
});
app.use('/lab-03', lab03App);

// Mount lab01 routes (/about, /time, /lab-01)
app.use('/lab-01', lab01App);
app.use(lab01App);

module.exports = app;
