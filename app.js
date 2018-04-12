const http = require('http');
const fs = require('fs');
const url = require('url');
const {URL} = require('url');


function createServer (app, port) {
	let server = http.createServer(app);
	server.listen(port, function () {
		console.log('server started port ' + port)
	});
}

createServer((req, res) => {
	const {headers, method} = req;
	
	
	const path = url.parse(req.url);

	if (path.pathname === '/') {
		fs.readFile(__dirname + '/index.html', (err, data) => {
			if (err) {
				res.writeHead(404, {'Content-Type':'text/html'});
				res.write('<h1>' + err + '</h1>');
				res.end();
				return;
			}
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write(data);
			res.end()
		});
	}

	if (path.pathname.indexOf('/public') !== -1) {
		fs.readFile(__dirname + path.pathname, (err, data) => {
			if (err) {
				res.writeHead(404, {'Content-Type':'text/html'});
				res.write('<h1>' + err + '</h1>');
				res.end();
				return;
			}
			res.writeHead(200, {'Content-Type':'text/javascript'});
			res.write(data);
			res.end()
		});
	}


	if (path.pathname.indexOf('/build') !== -1) {
		fs.readFile(__dirname + path.pathname, (err, data) => {
			if (err) {
				res.writeHead(404, {'Content-Type':'text/html'});
				res.write('<h1>' + err + '</h1>');
				res.end();
				return;
			}
			res.writeHead(200, {'Content-Type':'text/javascript'});
			res.write(data);
			res.end()
		});
	}

	if (path.pathname.indexOf('/dist') !== -1) {
		fs.readFile(__dirname + path.pathname, (err, data) => {
			if (err) {
				res.writeHead(404, {'Content-Type':'text/html'});
				res.write('<h1>' + err + '</h1>');
				res.end();
				return;
			}
			res.writeHead(200, {'Content-Type':'text/javascript'});
			res.write(data);
			res.end()
		});
	}

	if (path.pathname.indexOf('/lib') !== -1) {
		fs.readFile(__dirname + path.pathname, (err, data) => {
			if (err) {
				res.writeHead(404, {'Content-Type':'text/html'});
				res.write('<h1>' + err + '</h1>');
				res.end();
				return;
			}
			res.writeHead(200, {'Content-Type':'text/javascript'});
			res.write(data);
			res.end()
		});
	}
}, 8000)