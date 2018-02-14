var http = require('http');
var chkSum=require('./myModule.js');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    let answer=chkSum.checkSum(145,200);
    response.end("Hello From Kaema!");
    

});

var port = process.env.PORT || 1337;
server.listen(port);
chkSum.alwaysRunner();

console.log("Server running at http://localhost:%d", port);
