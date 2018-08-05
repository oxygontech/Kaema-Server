exports.notification_share=function (admin,userId){

    var db = admin.database();
    var ref = db.ref("/notifications/"+userId);

   
    console.log('Inside notifications module');

    //listening to changes on firebase
    ref.on("child_added", function(snapshot) {


    if(snapshot.val().notify_status=='N'){
             console.log(snapshot.val());
			   
			   // Notification content
			    const payload = {
			      notification: {
			          title: snapshot.val().title,
			          body: snapshot.val().message,
			          icon: snapshot.val().notificationImageUrl
			      }
			    }
    
       var deviceRef=db.ref("/device")
       deviceRef.orderByChild("userId").equalTo(userId).on("child_added", function(deviceSnap) {
          console.log(deviceSnap.val());

          admin.messaging().sendToDevice(deviceSnap.val().token,payload)
			  .then((response) => {
			    // Response is a message ID string.
			    console.log('Successfully sent message:', response);
			  })
			  .catch((error) => {
			    console.log('Error sending message:', error);
			  });

       })
        var updateshareRef=db.ref("notifications/"+userId+'/'+snapshot.key);
        updateshareRef.update({
          notify_status:'Y'
        });

    

  }

})

}





exports.notification_chat=function (admin,chatMessage,userId){

    var db = admin.database();
    var ref = db.ref("/chat_messages/"+chatMessage);

     console.log(chatMessage);
    //listening to changes on firebase
    ref.on("child_added", function(snapshot) {
 

    if(snapshot.val().notify_status=='N'){
             console.log(snapshot.val());
			   
			   // Notification content
			    const payload = {
			      notification: {
			          title: 'New Message',
			          body: snapshot.val().text,
			          tag :'message'
			      }
			    }
    
       var deviceRef=db.ref("/device")
       deviceRef.orderByChild("userId").equalTo(userId).on("child_added", function(deviceSnap) {
          console.log(deviceSnap.val());

          admin.messaging().sendToDevice(deviceSnap.val().token,payload)
			  .then((response) => {
			    // Response is a message ID string.
			    console.log('Successfully sent message:', response);
			  })
			  .catch((error) => {
			    console.log('Error sending message:', error);
			  });

       })
        var updateChatRef=db.ref("/chat_messages/"+chatMessage+'/'+snapshot.key);
        updateChatRef.update({
          notify_status:'Y'
        });

    

  }

})

}