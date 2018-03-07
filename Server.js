var http = require('http');
var profileModule=require('./firebase-modules/profile-module.js');

var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');


var router = express.Router(); 
var port = process.env.PORT || 1337;

router.get('/', function(req, res) {
    res.json({ message: 'Server is up and running' });   
});

app.use('/service', router);

app.listen(port);
console.log('Magic happens on port ' + port);
profileModule.profile_changed_listener();




/*var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello From Kaema!");
    

});



var port = process.env.PORT || 1337;
server.listen(port);
profileModule.profile_changed_listener();

console.log("Server running at http://localhost:%d", port);*/
