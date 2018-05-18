exports.post_reading = function (admin,readingObj){
console.log(readingObj);
var db = admin.database();
//assinging the name of the db ref to a variable

var leader_boardRef = db.ref("current_reading/");

var binRef=db.ref("/current_reading/"+readingObj.binId);
      binRef.once("value", function(currentRead) {

        var reading=currentRead.val().weight;
      	console.log(reading);

             if(parseInt(currentRead.val().weight)>parseInt(readingObj.weight)+5 || parseInt(currentRead.val().weight)<parseInt(readingObj.weight)-5){
              if(parseInt(readingObj.weight)<=0){
			              	leader_boardRef.child(readingObj.binId).set({
			          weight:parseInt(0),
			          height:parseInt(0),
			          door:parseInt(readingObj.door)
			        });
              }else{

              	leader_boardRef.child(readingObj.binId).set({
			          weight:parseInt(readingObj.weight),
			          height:parseInt(4),
			          door:parseInt(readingObj.door)
			        });


              }
          }
       
      });
      /*
var leader_boardRef = db.ref("current_reading/");

leader_boardRef.child(readingObj.binId).set({
          weight:parseInt(readingObj.weight),
          height:parseInt(readingObj.height),
          door:parseInt(readingObj.door)
        });*/

}
