var admin = require("firebase-admin");
var serviceAccount = require(".././kaema-159c6-firebase-adminsdk-phdnc-9a139dbaf7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kaema-159c6.firebaseio.com"
});
