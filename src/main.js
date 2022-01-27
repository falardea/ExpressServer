// This is the main entry point for the application.
const http = require('http');
const fs = require('fs');

const host = '127.0.0.1';
const port = 3000;

const staticPathPrefix = './src/client/';

const server = http.createServer((req, res) => {
    console.log(`page requested: ${req.url}`);
    const routerMap = {
        '': 'index.html',
        'about': 'about.html',
        'services': 'services.html'
    }

    render(res, routerMap[req.url.slice(1)]);
});

function render (res, htmlFile) {
    res.setHeader('Content-Type', 'text/html');
    if (fs.existsSync(`${staticPathPrefix}${htmlFile}`)) {
        res.statusCode = 200;
        fs.createReadStream(`${staticPathPrefix}${htmlFile}`).pipe(res);
    } else {
        render404(res);
    }
}

function render404 (res) {
    const htmlFile = 'PageNotFound.html';
    if (fs.existsSync(`${staticPathPrefix}${htmlFile}`)) {
        res.statusCode = 404;
        fs.createReadStream(`${staticPathPrefix}${htmlFile}`).pipe(res);
    } else {
        res.statusCode = 404;
        res.end('<!DOCTYPE html><html lang="en"><head>' +
            '<title>Page Not Found</title>' +
            '</head>' +
            '<body><div><h1>Page Not Found</h1><div><small>Error locating page requested</small></div></div>' +
            '</body>' +
            '</html>');
    }
}

server.listen(port, host, () => {
    console.log(`Hello simple world of npm`);
});
