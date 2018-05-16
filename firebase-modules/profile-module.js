/*var admin = require("firebase-admin");

var serviceAccount = require(".././kaema-159c6-firebase-adminsdk-phdnc-9a139dbaf7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kaema-159c6.firebaseio.com"
});*/

exports.profile_changed_listener=function (admin){

    var db = admin.database();
    var ref = db.ref("/profile");
    ref.on("child_changed", function(snapshot) {

      var profile= snapshot.val();



      var postRef=db.ref("/post");
      postRef.orderByChild("userId").equalTo(snapshot.key).on("child_added", function(postList) {

        console.log('this is the Post: '+postList.key);

        var updatePostRef=db.ref("/post/"+postList.key);
        updatePostRef.update({
          userProfile:profile
        });
      });



      var requestRef=db.ref("/request");
      requestRef.orderByChild("postedUser").equalTo(snapshot.key).on("child_added", function(requestList) {

        var updateRequestRef=db.ref("request/"+requestList.key+"/post");
        updateRequestRef.update({
          userProfile:profile
        });
      });


      var sharedRef=db.ref("/shared");
      sharedRef.orderByChild("sharedUser").equalTo(snapshot.key).on("child_added", function(sharedList) {

        console.log(sharedList.key);
        var updateSharedRef=db.ref("shared/"+sharedList.key+"/post");
        updateSharedRef.update({
          userProfile:profile
        });
      });


      var requestedUserRef=db.ref("/request");
      requestedUserRef.orderByChild("requestedUser").equalTo(snapshot.key).on("child_added", function(sharedList) {

        var updateRequestedUserRef=db.ref("request/"+sharedList.key);
        updateRequestedUserRef.update({
          requestedUserProfile:profile
        });
      });



      var sharedUserRef=db.ref("/shared");
      sharedUserRef.orderByChild("receivedUser").equalTo(snapshot.key).on("child_added", function(sharedList) {

        
        var updateSharedUserRef=db.ref("shared/"+sharedList.key);
        updateSharedUserRef.update({
          receivedUserProfile:profile
        });
      });

      var leaderUserRef=db.ref("/leader_board");
      leaderUserRef.orderByChild("userId").equalTo(snapshot.key).once("child_added", function(leaderList) {

        var updateLeaderUserRef=db.ref("leader_board/"+leaderList.key);
        updateLeaderUserRef.update({
          userProfile:profile
        });
      });

       var chatUser1Ref=db.ref("/chat");
      chatUser1Ref.orderByChild("userId1").equalTo(snapshot.key).once("child_added", function(chatUser1) {

        var updateChatUser1Ref=db.ref("chat/"+chatUser1.key);
        updateChatUser1Ref.update({
          userProfile1:profile
        });
      });

      var chatUser2Ref=db.ref("/chat");
      chatUser2Ref.orderByChild("userId2").equalTo(snapshot.key).once("child_added", function(chatUser2) {

        var updateChatUser2Ref=db.ref("chat/"+chatUser2.key);
        updateChatUser2Ref.update({
          userProfile1:profile
        });
      });

    });
}
