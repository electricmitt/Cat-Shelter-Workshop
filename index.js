// Imports for Node packages
const http = require('http');
const port = 3000;

http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	res.write('Hello JS World');
	res.end();
}).listen(port);

console.log("Port 3000 is open");