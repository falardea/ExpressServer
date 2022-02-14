const fs = require('fs');

function pageNotFound(req, res) {
	const htmlFile = 'PageNotFound.html';
	if (fs.existsSync(`${__dirname}/static/${htmlFile}`)) {
		res.statusCode = 404;
		fs.createReadStream(`${__dirname}/static/${htmlFile}`).pipe(res);
	} else {
		res.statusCode = 404;
		res.status(404).send('<!DOCTYPE html><html lang="en"><head>' +
			'<title>Page Not Found</title>' +
			'</head>' +
			'<body><div><h1>Page Not Found</h1><div><small>Error locating page requested</small></div></div>' +
			'</body>' +
			'</html>');
	}
}

module.exports.pageNotFound = pageNotFound;
