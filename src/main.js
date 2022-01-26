// This is the main entry point for the application.
const http = require('http');
const fs = require('fs');

const host = '127.0.0.1';
const port = 3000;

const staticPathPrefix = './src/client/';

const server = http.createServer((req, res) => {
    console.log(`page request: ${req.url}`);
    let htmlFile;

    if (req.url === '/') {
        htmlFile = 'index.html';
        res.statusCode = 200;
    } else if (req.url.endsWith('.html')) {
        htmlFile = req.url.slice(1);
        res.statusCode = 200;
    } else {
        htmlFile = 'PageNotFound.html';
        res.statusCode = 404;
    }

    res.setHeader('Content-Type', 'text/html');
    if (fs.existsSync(`${staticPathPrefix}${htmlFile}`)) {
        fs.createReadStream(`${staticPathPrefix}${htmlFile}`).pipe(res); // pipe the file into the response object
    } else {
        res.statusCode = 404;
        res.end('<!DOCTYPE html><html lang="en"><head>' +
            '<title>Page Not Found</title>' +
            '</head>' +
            '<body><div><h1>Page Not Found</h1><div><small>Error locating page requested</small></div></div>' +
            '</body>' +
            '</html>');
    }
});

server.listen(port, host, () => {
    console.log(`Hello simple world of npm`);
});
