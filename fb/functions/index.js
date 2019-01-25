const functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const defaultBalance = 10;

exports.makeUser = functions.auth.user().onCreate(user => {
  let uid = user.uid;
  // make a user record.
  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .create({
      id: uid,
      coins: defaultBalance,
      time: admin.firestore.FieldValue.serverTimestamp(),
    });
});
