/* 
 * (c) Dominique Guinard (www.guinard.org)
 * 
 */

var httpProxy = require('http-proxy'),
	fs = require('fs');

var port = "8001";
//
// Create a proxy server with custom application logic
//
httpProxy.createServer(function (req, res, proxy) {
	if(req.url.indexOf("/thngs") !== -1) {
		proxy.proxyRequest(req, res, {
			host: 'api.evrythng.com',
			port: 80
		});
	}
	
	//serve static content
	else {
		fs.readFile("../" + req.url, function (err,data) {
			if (err) {
				res.writeHead(404);
				res.end(JSON.stringify(err));
				return;
			}
			res.writeHead(200);
			res.end(data);
		});
	}
}).listen(8001);
console.log("EVRYTHNG Clickscript proxy started on http://localhost:" + port + "/wot-a-mashup.html");
