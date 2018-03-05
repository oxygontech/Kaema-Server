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

      var profile= snapshot.val();
      


      var postRef=db.ref("/post");
      postRef.orderByChild("userId").equalTo(snapshot.key).once("child_added", function(postList) {
        
        console.log('this is the Post: '+postList.key);

        var updatePostRef=db.ref("/post/"+postList.key);
        updatePostRef.update({
          userProfile:profile
        });
      });



      var requestRef=db.ref("/request");
      requestRef.orderByChild("postedUser").equalTo(snapshot.key).once("child_added", function(requestList) {
        
        var updatePostRef=db.ref("request/"+requestList.key+"/post");
        updatePostRef.update({
          userProfile:profile
        });
      });


      var sharedRef=db.ref("/shared");
      sharedRef.orderByChild("sharedUser").equalTo(snapshot.key).once("child_added", function(sharedList) {
        
        var updatePostRef=db.ref("shared/"+sharedList.key+"/post");
        updatePostRef.update({
          userProfile:profile
        });
      });


      var requestedUserRef=db.ref("/request");
      requestedUserRef.orderByChild("requestedUser").equalTo(snapshot.key).once("child_added", function(sharedList) {
        
        var updatePostRef=db.ref("request/"+sharedList.key);
        updatePostRef.update({
          requestedUserProfile:profile
        });
      });



      var sharedUserRef=db.ref("/shared");
      sharedUserRef.orderByChild("receivedUser").equalTo(snapshot.key).once("child_added", function(sharedList) {
        
        var updatePostRef=db.ref("shared/"+sharedList.key);
        updatePostRef.update({
          receivedUserProfile:profile
        });
      });
      
    });
}

