var http = require('http');

function start(route){
	//Server Listening
	http.createServer(onRequest).listen(8888);

	//Log
	console.log('Server started!');

	//Route requests
	function onRequest(request, response){
		route(request, response);
	}
}

//Start server
exports.start = start;