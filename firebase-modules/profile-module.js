var admin = require("firebase-admin");

var serviceAccount = require(".././kaema-159c6-firebase-adminsdk-phdnc-9a139dbaf7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kaema-159c6.firebaseio.com"
});






exports.profile_changed_listener=function (){

    var db = admin.database();
    var ref = db.ref("/profile");
    ref.on("child_changed", function(snapshot) {

      var userProfile= snapshot.val();
      var postRef=db.ref("/post");
      postRef.orderByChild("userId").equalTo(snapshot.key).once("child_added", function(postList) {
        
        console.log('this is the Post: '+postList.key);

        var updatePostRef=db.ref("/post/"+postList.key);
        updatePostRef.update({
          userProfile
        });
      });
      
    });
}

