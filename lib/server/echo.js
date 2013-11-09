//Inheritance
function Echo(){};
var BaseService = require('./baseService');
Echo.prototype = new BaseService();
Echo.prototype.constructor = Echo;

//@interface
Echo.prototype.get = get

//@implement
var PUBLIC_DIR = './public'

//
var mime = require('mime')
var url = require('url')
var fs = require('fs')
var util404 = require('./404')

function get(request, response){
	var path = decodeURIComponent(url.parse(request.url).pathname)
	console.log('request ' + path)
	var filePath = PUBLIC_DIR + path

	//Check if there is such file in public directory
	fs.exists(filePath, function(exists){
		if (exists === true){
			//stream out the file
			response.writeHead(200, {'Content-Type': mime.lookup(path)})
			var stream = fs.createReadStream(filePath)
			stream.pipe(response, {end: false})
			stream.on('end', function(){
				//End the response by self
				response.end()
			})
		}else{
			//not found
			util404.write404(response)

			console.log('echo not found' + filePath)
		}
	})
}

module.exports = new Echo()