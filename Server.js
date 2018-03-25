var http = require('http');

var profileModule =require('./firebase-modules/profile-module.js');
var scoreModule   =require('./firebase-modules/score-module.js');

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var admin = require("firebase-admin");
var serviceAccount = require("./kaema-159c6-firebase-adminsdk-phdnc-9a139dbaf7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kaema-159c6.firebaseio.com"
});
var router = express.Router();
var port = process.env.PORT || 1337;
//app.use(bodyParser.json,next());
// Add headers
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

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


//listen to Profile updates
router.post('/profile', function(req, res) {
	profileModule.profile_changed_listener(admin);
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
//listen to shares
router.post('/share', function(req, res) {
	//console.log(req.body);
	scoreModule.share_scoring(admin);
    res.json({ message: 'Requested by application' });
});


/*router.get('/profile_stats', function(req, res) {
	//console.log(req.body);
	scoreModule.save_profile_stats(admin);
    res.json({ message: 'Requested by application' });
});*/



app.use('/service', router);

app.listen(port);
console.log('Magic happens on port ' + port);
//profileModule.profile_changed_listener();

//profileModule.profile_changed_listener(admin);


/*var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello From Kaema!");


});



var port = process.env.PORT || 1337;
server.listen(port);
profileModule.profile_changed_listener();

console.log("Server running at http://localhost:%d", port);*/
