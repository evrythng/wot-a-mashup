/* 
 * (c) Dominique Guinard (www.guinard.org)
 * 
 */

var httpProxy = require('http-proxy'),
fs = require('fs');
twitter = require('ntwitter');

var i = 0;
var query = "evrythng";

var twit = new twitter({
	consumer_key: '1DkLp0NFat8oOLxgG5RQ',
	consumer_secret: '2RXXkbEmPKrDljG6iOBtBEtRfYNtfG0LvY77eM',
	access_token_key: '122665653-UT9E9HiodTutjcn4oSY99GAgttArmVFAD9l5d08l',
	access_token_secret: 'Qws5CybqmfwR97gsWsLVa5piPpjPLpXoHr6f5CBZto'
});

/*
 * Uses the Twitter streaming API to get the number of tweets about EVRYTHNG
 */
twit.stream('statuses/filter', {"track":query}, function(stream) {
	stream.on('data', function (data) {
		i++;
		console.log(data);
		console.log("Number of tweets for %s: %s", query, i);
	});
});

//
// Create a proxy server with custom application logic
//
httpProxy.createServer(function (req, res, proxy) {
	//
	// Put your custom server logic here
	//
	if (req.url.indexOf("/tweets") !== -1) {
		res.writeHead(200);
			res.end(JSON.stringify({"numberOfTweets" : i}));
	}
	
	if(req.url.indexOf("/thngs") == -1) {
		//serve static content
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
	else {
		//Prod proxy request to API
		proxy.proxyRequest(req, res, {
			host: 'api.evrythng.com',
			port: 80
		});
		
	//		//Local proxy request to API
	//		proxy.proxyRequest(req, res, {
	//			host: 'localhost',
	//			port: 8005
	//		});
	}
  
  
}).listen(8001);
