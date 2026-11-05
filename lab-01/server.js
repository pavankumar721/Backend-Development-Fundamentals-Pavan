const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Request logger middleware to log method, URL, and HTTP status code
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
  });
  next();
});

// Middleware to restore actual requested URL when Vercel rewrites to /server.js
app.use((req, res, next) => {
  const matched = req.headers['x-matched-path'];
  if (matched && !matched.startsWith('/server.js')) {
    req.url = matched;
  } else if (req.url.startsWith('/server.js')) {
    const rawQuery = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    req.url = '/' + rawQuery;
  }
  next();
});

// Handle /server.js directly if requested
app.all('/server.js', (req, res, next) => {
  req.url = '/';
  next();
});

// Route 1: GET / (Welcome text)
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Express Server - Backend Development Fundamentals!');
});

// Route 2: GET /about (JSON with name and section)
app.get('/about', (req, res) => {
  res.status(200).json({
    name: 'Pavan Kumar Reddy Kuncha',
    registrationNumber: '252U1R1187',
    section: 'CSE-D',
    department: 'Computer Science and Engineering',
    course: 'Backend Development Fundamentals',
    faculty: 'Sai Siva Teja',
    repository: 'https://github.com/pavankumar721/Backend-Development-Fundamentals-Pavan'
  });
});

// Route 3: GET /time (Current date and time using new Date())
app.get('/time', (req, res) => {
  const now = new Date();
  res.status(200).json({
    time: now.toString(),
    iso: now.toISOString(),
    epoch: now.getTime()
  });
});

// Route 4: Books routes
try {
  const lab03App = require('../lab-03/server.js');
  app.use('/books', (req, res, next) => {
    req.url = '/books' + (req.url === '/' ? '' : req.url);
    lab03App(req, res, next);
  });
  app.use('/lab-03', lab03App);
} catch (e) {
  console.error('Failed to mount lab-03 routes:', e);
}

// Catch-all 404 handler for any unknown path
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}. Route not found.`,
    statusCode: 404
  });
});

// Start Express server if run directly (local / Render / Railway)
if (require.main === module && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
