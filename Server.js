var http = require('http');
var profileModule=require('./firebase-modules/profile-module.js');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello From Kaema!");
    

});

var port = process.env.PORT || 1337;
server.listen(port);
profileModule.profile_changed_listener();

console.log("Server running at http://localhost:%d", port);
