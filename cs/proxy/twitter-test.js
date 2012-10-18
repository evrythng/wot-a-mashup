var twitter = require('ntwitter');
	restify = require('restify');

var i = 0;
var query = "evrythng";

var twit = new twitter({
	consumer_key: '1DkLp0NFat8oOLxgG5RQ',
	consumer_secret: '2RXXkbEmPKrDljG6iOBtBEtRfYNtfG0LvY77eM',
	access_token_key: '122665653-UT9E9HiodTutjcn4oSY99GAgttArmVFAD9l5d08l',
	access_token_secret: 'Qws5CybqmfwR97gsWsLVa5piPpjPLpXoHr6f5CBZto'
});


var server = restify.createServer({
	name: 'thng-twitter',
	version: '1.0.0'
});

server.use(restify.bodyParser({
	mapParams: false
}));


server.get("/tweets", function (req, res) {
	res.json(200, {"numberOfTweets" : i});
});

server.listen(8020, function () {
	console.info("%s listening at %s", server.name, server.url);
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

//twit.stream('statuses/filter', {"location":"-0.091631,10,51.521455,10"}, function(stream) {
//	stream.on('data', function (data) {
//		i++;
//		console.log(i);
//	});
//});


