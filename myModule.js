var admin = require("firebase-admin");

var serviceAccount = require("./kaema-159c6-firebase-adminsdk-phdnc-9a139dbaf7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kaema-159c6.firebaseio.com"
});

exports.checkSum=function (num1,num2){
     return num1+num2;
}


exports.alwaysRunner=function (){
    firebaseData();
   // setInterval(function(){logger()}, 5000);
}

function logger(){
    console.log('This is being called Continously every 5 sec')
}


function firebaseData(){
    var db = admin.database();
    var ref = db.ref("/admin_data");
    ref.once("value", function(snapshot) {
      console.log(snapshot.val());
      //return snapshot;
    });
}