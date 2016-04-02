var http = require("http")
// http is module, we require(to access), and saved as a var to access it.
var fs = require("fs")
var path = require("path")

// Create server. Creating server is a method of http.
http.createServer(function(request, response) {
	console.log(request.url)
	if (request.url === "/") { // "/" is the root
		// serve the homepage
		fs.readFile("./site/home.html", function(error, content) {
			response.writeHead(200, {
				"Content-Type" : "text/html"
			})
			response.end(content, "utf-8")
		})
	} else {
		var filePath = "." + request.url 
		fs.exists(filePath, function(exists) {
			if (exists) {
				fs.readFile(filePath, function(error, content) {
					response.writeHead(200, {
						"Content-Type" : "text/html"
					})
					response.end(content, "utf-8")
				})
			} else {
				response.writeHead(404, {
					"Content-Type" : "text/plain"
				})
				response.end("Page Not Found.")
			}
		})

	}

	
}).listen(8000)