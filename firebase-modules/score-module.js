
//variable Set up
/*var admin = require("firebase-admin");

var serviceAccount = require(".././kaema-159c6-firebase-adminsdk-phdnc-9a139dbaf7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kaema-159c6.firebaseio.com"
});*/

//final variables that will determine the score
var finalSharedScore=100;
var finalReceivedScore=10;

//this function will listen for new Sharing events award points to User when they Share Food
exports.share_scoring=function (admin){

    var db = admin.database();
    var ref = db.ref("/shared");

  //  console.log('Reached here');


    //listening to changes on firebase
    ref.on("child_added", function(snapshot) {

    
    ref.orderByChild("scoreStatus").equalTo('N').on("child_added", function(snapshot) {




//console.log(snapshot.val());
//once the event is triggered variables are assigned values


      var shared= snapshot.val();
      var sharedUserNewScore=0;
      var sharedUserScore=0;
      var receivedUserScore=0;
      //getting the amount of times this post has been shared
      var shares=parseInt(shared.post.shares);

//zero points will be awarded if the number of times a post has been shared is has exceeded a certain limit
      if(shares>0){
         sharedUserNewScore=finalSharedScore/shares;
      }else{
        sharedUserNewScore=finalSharedScore;
      }




    //getting the reuquired user's leaderboard reference 
     var requestedUserRef=db.ref("/leader_board");
     var checkExist=false;


      requestedUserRef.orderByChild("userId").equalTo(shared.post.userId).on("child_added", function(leaderBoardUser) {


     try{
        console.log(leaderBoardUser.key);
        sharedUserScore=leaderBoardUser.val().score;



        console.log('Score :' +sharedUserScore);

        //calculating the final score
        var finalScore=parseInt(sharedUserScore)+parseInt(sharedUserNewScore);
        //console.log('New Score : '+ answer);


        //updating the leaderboard
       var updatesharedUserRef=db.ref("leader_board/"+leaderBoardUser.val().userId);
        updatesharedUserRef.update({
          score:finalScore
        });

        checkExist=true;
    }catch(e){
       checkExist=true;
       console.log("Catch Exception  "+e);
    }


      
			});
			  
	






        //leaderboard update for received user aswell,Score for receiving is lower tha for sharing  


     var receivedUserRef=db.ref("/leader_board");
      checkreceiverExist=false;
      receivedUserRef.orderByChild("userId").equalTo(shared.receivedUser).once("child_added", function(leaderBoardUser) {

      try{
        //console.log(leaderBoardUser.key);
        requestedUserScore=leaderBoardUser.val().score;



        console.log('Score :' +requestedUserScore);

        var finalScore=parseInt(requestedUserScore)+parseInt(finalReceivedScore);
        //console.log('New Score : '+ answer);

       var updatereceivedUserRef=db.ref("leader_board/"+leaderBoardUser.val().userId);
        updatereceivedUserRef.update({
          score:finalScore
        });

        checkreceiverExist=true;
    }catch(e){
       checkreceiverExist=true;
       console.log("Catch Exception  "+e);
    }


  });

        var updateshareRef=db.ref("shared/"+snapshot.key);
        updateshareRef.update({
          scoreStatus:'Y'
        });



	
	
  

    });

  });
}






exports.save_profile_stats=function (admin){

  var db = admin.database();
  var receivedUserRef=db.ref("/profile");
      
      receivedUserRef.on("child_added", function(profile) {
      
      var leader_boardRef = db.ref("profile_stats/");
      leader_boardRef.child(profile.key).set({

                userId:profile.key,
                post:0,
                share:0,
                receipt:0


         });

      });
}
