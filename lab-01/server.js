const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Request logger middleware to log method, URL, and HTTP status code
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
  });
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

// Forward any /books routes to lab-03 server if hit on this server instance
try {
  const lab03App = require('../lab-03/server.js');
  app.use('/books', (req, res, next) => {
    req.url = '/books' + (req.url === '/' ? '' : req.url);
    lab03App(req, res, next);
  });
  app.use('/lab-03', lab03App);
} catch (e) {
  // Ignore if lab-03 is not present
}

// Route 4: Catch-all 404 handler for any unknown path
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
