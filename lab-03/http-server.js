const http = require('http');

const PORT = 3001; // different port to avoid conflict with server.js

// Plain HTTP Server using Node.js built-in http module
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Lab 03 plain HTTP server');
});

server.listen(PORT, () => {
  console.log(`Plain HTTP server is running on http://localhost:${PORT}`);
});
