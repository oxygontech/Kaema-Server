var http = require('http');
var profileModule =require('./firebase-modules/profile-module.js');
var scoreModule   =require('./firebase-modules/score-module.js');
var notifyModule   =require('./firebase-modules/notification-module.js');
var firebaseWasteMonitor  =require('./firebase-modules/firebase-wastemonitor.js');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./kaema-uat-firebase-adminsdk-j31yk-143462cfab.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kaema-uat.firebaseio.com"
});
var router = express.Router();
var port = process.env.PORT || 1337;
/**
   * ***************SECURITY RISK*************
   * 1.Prevented direct access by using a router and changing the url, also groups services under one url - resolved.
   *
   *
   */
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
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001');
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
router.post('/binweight', function(req, res) {
	console.log(JSON.stringify(req.body));
  firebaseWasteMonitor.post_reading(admin,req.body);
	//console.log(req);
  res.json({ "message": 'Weight Recieved' });
});
//app.use('/service', router);
//listen to shares
router.post('/share', function(req, res) {
	//console.log(req.body);
	scoreModule.share_scoring(admin);
	console.log('Request Received');
    res.json({ message: 'Requested by application' });
});

router.post('/policy', function(req, res) {
  //console.log(req.body);
  
    console.log('Request Received');
    res.json({ policy: 'https://www.google.com/' ,term:'https://www.google.com/'});
});


router.post('/notify', function(req, res) {
  notifyModule.notification_share(admin,req.body.userId);
    res.json({ message: 'Requested by application' });
});

router.post('/chat_notify', function(req, res) {
    console.log(JSON.stringify(req.body));
    //console.log(req.chatMessage);
    notifyModule.notification_chat(admin,req.body.chatMessage,req.body.userId,req.body.userName);
    res.json({ message: 'Requested by application' });
});




app.use('/service', router);

app.listen(port);
console.log('Magic happens on port ' + port);
 //notifyModule.notification_chat(admin,'ETqlyN17pXbyWJRPHwxeNYH6BWu2_P5sD8EzHYnSgNGts0MFcD9iBWnc2','P5sD8EzHYnSgNGts0MFcD9iBWnc2');