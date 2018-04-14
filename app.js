const http = require('http');
const fs = require('fs');
const URL = require('url');

function createServer (app, port) {
	let server = http.createServer(app);
	server.listen(port, function () {
		console.log('server started port ' + port)
	});
}

createServer((req, res) => {
	const {headers, method} = req;
	const url = URL.parse(req.url);
	const paths = ['/build','/public','/dist','/lib'];

	if (url.pathname === '/') {
		fs.readFile(__dirname + '/index.html', (err, data) => {
			if (err) {
				res.writeHead(404, {'Content-Type':'text/html'});
				res.write('<h1>' + err + '</h1>');
				res.end();
				return;
			}
			res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
			res.write(data);
			res.end()
		});
	} else {
		fs.readFile(__dirname + url.pathname, (err, data) => {
			if (err) {
				res.writeHead(404, {'Content-Type':'text/html'});
				res.write('<h1>' + err + '</h1>');
				res.end();
				return;
			}
			res.writeHead(200, {'Content-Type':'text/javascript; charset=utf-8'});
			res.write(data);
			res.end()
		});
	}
}, 8000)