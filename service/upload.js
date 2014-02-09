function Upload() {};
Upload.prototype = require('../lib/server/baseService');
var uploadService = new Upload();
module.exports = uploadService;

//@interface
uploadService.post = post;

//@implement
var PoorForm = require('poor-form');
var fs = require('fs');

//postFile object constructor
function PostFile(filename, path){
	this.filename = filename;
	this.path = path;
};

function post(request, response){
	var postBody = {'title': '', 'images': []};
	var currentField = {};
	var fielddata = 0;

	//
	var formParser = PoorForm.create(request);

	formParser.on('fieldstart', function(header){
		currentField = header;
		switch(header.name){
			case 'title':
				fielddata = '';
				break;

			case 'images':
				fielddata = new Buffer(0);
				break;

			default:
				break;
		}
	});

	formParser.on('fielddata', function(chunck){
		if(fielddata instanceof Buffer){
			//binary data
			fielddata = Buffer.concat([fielddata, chunck]);
		}else{
			fielddata += chunck;
		}
	});

	formParser.on('fieldend', function(){
		console.log(currentField.name);

		if (currentField.name === 'title'){
			postBody.title = fielddata;
		}else if(currentField.name === 'images'){
			//first save data
			tmpPath = './public/'+currentField.filename;
			fs.writeFileSync(tmpPath, fielddata);

			postBody.images.push(new PostFile(currentField.filename, tmpPath));
		}
	});

	formParser.on('formend', function(){
		response.end(JSON.stringify(postBody));
	});
}