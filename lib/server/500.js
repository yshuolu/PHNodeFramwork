function write500(response){
	response.writeHead('500', {'Content-Type': 'text/plain'})
	response.write('500 Server Error!')
	response.end()
}

exports.write500 = write500