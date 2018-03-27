const http = require('http');
const fs = require('fs');


function createServer (app, port) {
	let server = http.createServer(app);
	server.listen(port);
	console.log('server started')
}



createServer((req, res) => {
	const {headers, method, url} = req;
	if (url === '/') {
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

	if (url.indexOf('/public') !== -1) {
		fs.readFile(__dirname + url, (err, data) => {
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

	if (url.indexOf('/lib') !== -1) {
		fs.readFile(__dirname + url, (err, data) => {
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