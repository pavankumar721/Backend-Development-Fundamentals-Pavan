const http = require('http');

const PORT = 3000;

// Plain HTTP Server using Node.js built-in http module
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello');
});

server.listen(PORT, () => {
  console.log(`Plain HTTP server is running on http://localhost:${PORT}`);
});
