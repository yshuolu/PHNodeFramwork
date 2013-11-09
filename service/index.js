function Index(){}
Index.prototype = require('../lib/server/baseService');
var indexService = new Index();
module.exports = indexService;

//@interface
indexService.get = get;

//@implement
var PUBLIC_DIR = './public';
var fs = require('fs');
var path = require('path');
var util500 = require('../lib/server/500');

function get(request, response){
	
	var htmlPagePath = path.join(PUBLIC_DIR, 'index.html');

	fs.exists(htmlPagePath, function(exists){
		if (exists === true){
			//just output index.html
			response.writeHead(200, {'Content-Type': 'text/html'});
			var stream = fs.createReadStream(htmlPagePath);
			stream.pipe(response, {end: false});
			stream.on('end', function(){
				response.end('Bye bye!');
			});
		}else{
			//500 server error
			util500.write500(response);
		}
	})

}