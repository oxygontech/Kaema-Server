exports.post_reading = function (admin,readingObj){
console.log(readingObj);
var db = admin.database();
//assinging the name of the db ref to a variable
var leader_boardRef = db.ref("current_reading/");
leader_boardRef.child(readingObj.binId).set({
          weight:parseInt(readingObj.weight)
          //userId:shared.post.userId,
        //  userProfile:shared.post.userProfile

        });

}
