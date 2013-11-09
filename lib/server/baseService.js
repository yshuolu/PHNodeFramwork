var util404 = require('./404');

function BaseService(){};

BaseService.prototype.handleRequest = function(request, response){
	
	var method = request.method.toLowerCase();

	if (method in this){
		this[method](request, response);
	}else{
		util404.write404(response);
	}
	
}

var baseService = new BaseService();

//
module.exports = baseService;