const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the port to use
const port = process.env.PORT || 3000;

// Mime types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

// Create the server
const server = http.createServer((request, response) => {
  // Parse the URL
  const parsedUrl = url.parse(request.url);
  
  // Extract the pathname
  let pathname = `.${parsedUrl.pathname}`;
  
  // If path ends with '/', append 'index.html'
  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }
  
  // Get the file extension
  const ext = path.extname(pathname);
  
  // Check if the file exists
  fs.access(pathname, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist, return a 404
      response.statusCode = 404;
      response.end(`File ${pathname} not found!`);
      return;
    }
    
    // Read the file
    fs.readFile(pathname, (err, data) => {
      if (err) {
        // If there's an error reading the file, return a 500
        response.statusCode = 500;
        response.end(`Error reading file: ${err.message}`);
        return;
      }
      
      // Set the content type
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      response.setHeader('Content-Type', contentType);
      
      // Send the response
      response.end(data);
    });
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Press Ctrl+C to stop the server`);
});