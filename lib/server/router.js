var SERVICE_ROOT_DIR = '../../service/';

var url = require('url');
var path = require('path');

//init services with config
var serviceMap = initAllServices(global.phnodeserver.getConfig());

function route(request, response){
	var requestPath = decodeURIComponent(url.parse(request.url).pathname);

	var handler = serviceMap['/' + requestPath.split('/')[1]];
	if (handler) {
		'handleRequest' in handler ? handler.handleRequest(request, response) : null;
	}else{
		//Echo file
		serviceMap['*'].handleRequest(request, response);
	}

}

function initAllServices(config){
	//A service map with echo service
	var serviceMap = {'*': require('./echo')};

	//Try load every service module
	for (var servicePath in config){
		var handler = null;
		try{
			handler = require(path.join(SERVICE_ROOT_DIR, config[servicePath]));
		}catch(e){
			console.log('Module ' + config[servicePath] + ' not exists!');
		}

		if (handler) {
			serviceMap[servicePath] = handler;
		};
	}

	return serviceMap;
}

exports.route = route;
