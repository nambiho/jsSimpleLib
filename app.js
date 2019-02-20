const http = require('http');
const fs = require('fs');
const URL = require('url');

const origin = {
	'Access-Control-Allow-Origin': 'http://localhost:8000',
	'Access-Control-Allow-Credentials': true,
	'Access-Control-Allow-Headers': 'X-Response1'
}

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

	if (method == 'POST') {
		var jsonString=[];
		req.on('data', (chunk) => {
			jsonString.push(chunk);
		}).on('end', function () {
			console.log(Buffer.concat(jsonString).toString());
		});
	}

	if (url.pathname === '/') {
		fs.readFile(__dirname + '/index.html', (err, data) => {
			if (err) {
				res.writeHead(404, {'Content-Type':'text/html'});
				res.write('<h1>' + err + '</h1>');
				res.end();
				return;
			}
			
			res.writeHead(200, Object.assign({'Content-Type': 'text/html; charset=utf-8'}, origin));
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
			res.writeHead(200, Object.assign({'Content-Type': 'text/html; charset=utf-8'}, origin));
			res.write(data);
			res.end()
		});
	}
}, 9000);