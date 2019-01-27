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

function getSlotWin() {
  let randomValue = Math.random();
  //console.log(randomValue);
  randomValue -= 0.25;
  if (randomValue < 0) {
    return 1;
  }

  randomValue -= 0.1;
  if (randomValue < 0) {
    return 2;
  }

  randomValue -= 0.024;
  if (randomValue < 0) {
    return 5;
  }
  randomValue -= 0.018;
  if (randomValue < 0) {
    return 10;
  }
  randomValue -= 0.004;
  if (randomValue < 0) {
    return 50;
  }

  return 0;
}
function drawItem(items) {
  let convertedItems = items
    .map(i => {
      return Object.assign({}, i, { chance: i.chance / 100 });
    })
    .sort((a, b) => a.order - b.order);

  //console.log(convertedItems);

  // ohne ober ende!
  let winValue = Math.random();
  let origWinValue = winValue;
  let winningItem = null;
  for (let x = 0; x < convertedItems.length; x++) {
    let i = convertedItems[x];
    winValue -= i.chance;
    if (winValue < 0) {
      //console.log("found winner!");
      winningItem = i;
      break;
    }
  }

  if (!winningItem) {
    winningItem = convertedItems[convertedItems.length - 1];
  }

  return winningItem;
}
exports.openCrate = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "wmfVWOinweOLYiKpvQ65bnb3cVg1";
  let userCrateId = data.crateId;
  let db = admin.firestore();

  var userRef = db.collection("users").doc(uid);
  return db
    .runTransaction(transaction => {
      return transaction
        .get(userRef)
        .then(userDoc => {
          let userCrateRef = userRef.collection("crates").doc(userCrateId);
          return transaction
            .get(userCrateRef)
            .then(userCrate => {
              let userData = userDoc.data();
              let userCrateData = userCrate.data();
              if (!userData || !userCrateData) {
                console.log("crate not found");
                throw "Crate not found.";
              }

              if (userCrateData.opened == true) {
                throw "Crate already opened";
              }
              let crateRef = db.collection("crates").doc(userCrateData.crateId);
              return transaction
                .get(crateRef)
                .then(crateSnap => {
                  let crateData = crateSnap.data();
                  if (!crateData) {
                    throw "Corresponding crate not found.";
                  }
                  //got all data! determine the win.
                  let itemWon = drawItem(crateData.items);
                  console.log(itemWon);
                  if (itemWon.type == "coins") {
                    //give coins to user.
                    var newCoins = userData.coins + parseInt(itemWon.value);
                    transaction.update(userRef, { coins: newCoins });
                    transaction.update(userCrateRef, {
                      opened: true,
                      content: itemWon
                    });
                    logTransaction(uid, "Crate win", itemWon.value);
                    return { item: itemWon };
                  } else if (itemWon.type == "crate") {
                    let newUserCrate = userRef.collection("crates").doc();
                    transaction.create(newUserCrate, {
                      crateId: itemWon.crateId,
                      time: admin.firestore.FieldValue.serverTimestamp(),
                      price: 0,
                      opened: false,
                      id: newUserCrate.id
                    });
                    transaction.update(userCrateRef, {
                      opened: true,
                      content: itemWon
                    });
                    return { item: itemWon, newCrateId: newUserCrate.id };
                    //give crate to user
                  } else if (itemWon.type == "product") {
                    //give product. to user
                    let newUserVoucher = userRef.collection("vouchers").doc();
                    transaction.create(newUserVoucher, {
                      productId: itemWon.productId,
                      time: admin.firestore.FieldValue.serverTimestamp(),
                      price: itemWon.resellValue,
                      id: newUserVoucher.id
                    });
                    transaction.update(userCrateRef, {
                      opened: true,
                      content: itemWon
                    });
                    return { item: itemWon, voucherId: newUserVoucher.id };
                  }
                  //done.
                })
                .catch(err => {
                  throw err;
                });
            })
            .catch(err => {
              console.log("error!!");
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    })
    .then(r => {
      console.log("transaction done!!!", r);
      return { status: "ok", data: r };
    })
    .catch(err => {
      console.log("errorrr!!");
      return { error: true, text: err };
    });

  return db
    .collection("users")
    .doc(uid)
    .collection("crates")
    .doc(userCrateId)
    .get()
    .then(userCrate => {
      console.log(userCrate.data());
    });
});

exports.buyCrate = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "wmfVWOinweOLYiKpvQ65bnb3cVg1";

  let crateId = data.crateId;

  let db = admin.firestore();
  let userRef = db.collection("users").doc(uid);
  let newUserCrate = userRef.collection("crates").doc();
  return db
    .collection("crates")
    .doc(crateId)
    .get()
    .then(snap => {
      let crate = snap.data();
      if (crate) {
        let price = crate.price;
        return db
          .runTransaction(transaction => {
            return transaction.get(userRef).then(userDoc => {
              if (userDoc.data().coins < price) {
                throw "Not enough coins";
              }
              var newCoins = userDoc.data().coins - price;

              transaction.update(userRef, { coins: newCoins });
              transaction.create(newUserCrate, {
                crateId: crateId,
                opened: false,
                time: admin.firestore.FieldValue.serverTimestamp(),
                price: price,
                id: newUserCrate.id
              });
            });
          })
          .then(() => {
            console.log("Transaction successfully committed!");
            logTransaction(uid, "Crate purchase", -price);
            return { status: "ok", userCrate: newUserCrate.id };
          })
          .catch(function(error) {
            console.log("Transaction failed: ", error);
            return { error: true, text: error };
          });
      } else {
        return { error: true, text: "Crate does not exist." };
      }
    });
  //check if user has enough coins
  // determine & credit win!
});
exports.slot = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "wmfVWOinweOLYiKpvQ65bnb3cVg1";

  let bet = data.bet;

  let win = getSlotWin();
  let addCoins = -bet;
  let winAmount = win * bet;
  addCoins += winAmount;
  //console.log({ bet, win, addCoins });

  let db = admin.firestore();
  var userRef = db.collection("users").doc(uid);
  return db
    .runTransaction(transaction => {
      return transaction.get(userRef).then(userDoc => {
        if (userDoc.data().coins < bet) {
          throw "Not enough coins";
        }
        var newCoins = userDoc.data().coins + addCoins;
        transaction.update(userRef, { coins: newCoins });
      });
    })
    .then(() => {
      console.log("Transaction successfully committed!");
      logTransaction(uid, "Slot bet", -bet);
      if (win > 0) {
        logTransaction(uid, "Slot win!", winAmount);
      }

      return { win: win, amount: win > 0 ? winAmount : -bet };
    })
    .catch(function(error) {
      return { error: true, text: error };
      console.log("Transaction failed: ", error);
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
    .runTransaction(transaction => {
      return transaction.get(userRef).then(userDoc => {
        if (userDoc.data().coins < data.bet) {
          throw "Not enough coins";
        }
        var newCoins = userDoc.data().coins + addCoins;
        transaction.update(userRef, { coins: newCoins });
      });
    })
    .then(() => {
      console.log("Transaction successfully committed!");
      logTransaction(uid, "Coin flip bet", -data.bet);
      if (outcome) {
        logTransaction(uid, "Coin flip win!", data.bet * 2);
      }

      return { win: outcome, amount: outcome ? data.bet * 2 : -data.bet };
    })
    .catch(error => {
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
