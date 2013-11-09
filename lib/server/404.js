function write404(response){
	response.writeHead('404', {'Content-Type': 'text/plain'})
	response.write('404 NOT FOUND!')
	response.end()
}

exports.write404 = write404