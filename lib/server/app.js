var CONFIG_PATH = './config/config.json';

var fs = require('fs');

//First, load configs
global.phnodeserver={};
global.phnodeserver.config = JSON.parse(fs.readFileSync(CONFIG_PATH, encoding='utf8'));
global.phnodeserver.getConfig = function(){
	return JSON.parse(JSON.stringify(global.phnodeserver.config));
}

//
var server = require('./server');
var router = require('./router');

server.start(router.route);
