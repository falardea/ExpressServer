// This is the main entry point for the application.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const { pageNotFound } = require('./utils/pageNotFound');

const jsonParser = bodyParser.json();
const host = '127.0.0.1';
const port = 5000;
const logFile = 'someLogExample.log';
const dataFile = 'initData.json';

app.use(cors());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/getLog', (req, res) => {
	fs.readFile(`${__dirname}/${logFile}`, 'utf-8', (err, data) => {
		if (!err) {
			console.log(`log data: ${data}`);
			res.end(data);
		} else {
			console.log(`no data found in file ${logFile}`);
			res.end('no data found');
		}
	});
});

app.get('/getUsers', (req, res) => {
	const params = req.query;
	console.log(`req params: ${params.id}`);
	fs.readFile(`${__dirname}/${dataFile}`, (err, data) => {
		if (!err) {
			const userObj = JSON.parse(data);
			console.log(`json parsed: ${userObj}`)
			console.log(`user data: ${data}`);
			res.end(data.toString());
		} else {
			console.log(`no data found in ${dataFile}`);
			res.end(JSON.stringify({msg: `${dataFile} not found`}));
		}
	});
});

app.post('/angle/:angle', jsonParser, (req, res) => {
	const reqData = req.body;
	console.log(`data received: ${reqData.theta}`);
	res.header({ 'Content-Type': 'application/json' })
	res.json({theta: reqData.theta});
})

app.use((req, res) => pageNotFound(req, res));

const server = app.listen(port, () => {
	server.host = host;
	server.port = port;
	console.log(`Serving API on http://${host}:${port}`);
});
