var http = require('http');
var profileModule=require('./firebase-modules/profile-module.js');

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');


var router = express.Router();
var port = process.env.PORT || 1337;

app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res) {
    res.json({ message: 'Server is up and running' });
});

router.post('/profile', function(req, res) {
	profileModule.profile_changed_listener();
	//console.log(req);
    res.json({ message: 'Requested by application' });
});


//this will send the weight of the bin to the firebase.
app.post('/binweight', function(req, res) {
  console.log("Kaema");
	console.log(JSON.stringify(req.body));
	//console.log(req);
 res.json({ "message": 'Weight Recieved' });
});

//app.use('/service', router);

app.listen(port);
console.log('Magic happens on port ' + port);
//profileModule.profile_changed_listener();




/*var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello From Kaema!");


});



var port = process.env.PORT || 1337;
server.listen(port);
profileModule.profile_changed_listener();

console.log("Server running at http://localhost:%d", port);*/
