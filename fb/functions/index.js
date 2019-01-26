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
      time: admin.firestore.FieldValue.serverTimestamp()
    });
});

exports.coinflip = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  let outcome = Math.random() <= 0.45;
  let betsize = data.bet;

  let addCoins = -data.bet;
  if (outcome) {
    addCoins = data.bet;
  }
  let db = admin.firestore();
  var userRef = db.collection("users").doc(uid);
  return db
    .runTransaction(function(transaction) {
      return transaction.get(userRef).then(function(userdoc) {
        if (userdoc.data().coins < data.bet) {
          throw "Not enough coins";
        }
        var newCoins = userdoc.data().coins + addCoins;
        transaction.update(userRef, { coins: newCoins });
      });
    })
    .then(function() {
      console.log("Transaction successfully committed!");
      logTransaction(uid, "Coin flip bet", -data.bet);
      if (outcome) {
        logTransaction(uid, "Coin flip win!", data.bet * 2);
      }

      return { win: outcome, amount: outcome ? data.bet * 2 : -data.bet };
    })
    .catch(function(error) {
      return { error: true, text: error };
      console.log("Transaction failed: ", error);
    });
});

function logTransaction(user, text, amount) {
  let db = admin.firestore();
  var userRef = db.collection("users").doc(user);
  userRef
    .collection("transactions")
    .doc()
    .set({ time: admin.firestore.FieldValue.serverTimestamp(), amount, text });
  db.collection("transactions")
    .doc()
    .set({
      time: admin.firestore.FieldValue.serverTimestamp(),
      amount,
      text,
      user
    });
}
