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

  //let uid = "8UuBdgKlpmUUitTImczv9iLSre72";
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
                      content: itemWon,
                      openedTime: admin.firestore.FieldValue.serverTimestamp()
                    });
                    logTransaction(uid, "Crate prize", itemWon.value);
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
                      content: itemWon,
                      openedTime: admin.firestore.FieldValue.serverTimestamp()
                    });
                    return { item: itemWon, newCrateId: newUserCrate.id };
                    //give crate to user
                  } else if (itemWon.type == "product") {
                    //give product. to user
                    let newUserVoucher = userRef.collection("vouchers").doc();
                    transaction.create(newUserVoucher, {
                      productId: itemWon.productId,
                      item: itemWon,
                      used: false,
                      sold: false,
                      time: admin.firestore.FieldValue.serverTimestamp(),
                      price: itemWon.resellValue,
                      id: newUserVoucher.id
                    });
                    transaction.update(userCrateRef, {
                      opened: true,
                      content: itemWon,
                      openedTime: admin.firestore.FieldValue.serverTimestamp()
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

  //let uid = "8UuBdgKlpmUUitTImczv9iLSre72";

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

  //let uid = "8UuBdgKlpmUUitTImczv9iLSre72";

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
      logTransaction(uid, "Emoji spin bet", -bet);
      if (win > 0) {
        logTransaction(uid, "Emoji spin prize", winAmount);
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
        logTransaction(uid, "Coin flip prize", data.bet * 2);
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

exports.quickSell = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "8UuBdgKlpmUUitTImczv9iLSre72";

  let voucherId = data.voucherId;

  let db = admin.firestore();
  var userRef = db.collection("users").doc(uid);
  var voucherRef = db
    .collection("users")
    .doc(uid)
    .collection("vouchers")
    .doc(voucherId);
  return db.runTransaction(transaction => {
    return transaction
      .get(voucherRef)
      .then(voucherDoc => {
        return transaction.get(userRef).then(userDoc => {
          let userData = userDoc.data();
          let voucherData = voucherDoc.data();
          if (
            !voucherData ||
            voucherData.used ||
            voucherData.sold ||
            !voucherData.price
          ) {
            throw "Can not sell this!";
          }
          console.log("is valid to sell!");
          transaction.update(userRef, {
            coins: userData.coins + voucherData.price
          });
          transaction.update(voucherRef, { sold: true });
          logTransaction(uid, "Quick sell voucher", voucherData.price);
          return;
        });
      })
      .then(r => {
        console.log("TX finished!");
        return { status: "ok" };
      })
      .catch(e => {
        console.log("Error!", e);
        return { error: true, text: e };
      });
  });
});

exports.order = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "BJfqbecAOiTebHd4OZYYoopltey2";

  let db = admin.firestore();
  let productId = data.productId;
  let voucherRef = null;

  let address = data.address;
  let saveAddress = data.saveAddress;
  let shippingOption = data.shippingOption;
  let voucherId = data.voucherId || null;
  if (!productId || !address || address.length < 10) {
    return { error: true, text: "Invalid request." };
  }
  let productRef = db.collection("products").doc(productId);
  var userRef = db.collection("users").doc(uid);
  if (data.useVoucher) {
    voucherRef = db
      .collection("users")
      .doc(uid)
      .collection("vouchers")
      .doc(voucherId);
  }
  return db.runTransaction(transaction => {
    return transaction
      .get(userRef)
      .then(userDoc => {
        if (!userDoc.exists) {
          throw "User not found!";
        }
        let userData = userDoc.data();
        return transaction.get(productRef).then(productDoc => {
          if (!productDoc.exists) {
            throw "Product not found.";
          }
          let productData = productDoc.data();
          let completeOrder = voucherDoc => {
            console.log(
              "completing order",
              voucherDoc ? "with voucher" : "no voucher"
            );

            // validate voucher
            if (voucherDoc) {
              if (!voucherDoc.exists) {
                throw "Voucher does not exist";
              }
              let voucherData = voucherDoc.data();
              if (voucherData.productId != productId) {
                throw "invalid voucher!";
              }
              if (voucherData.sold == true || voucherData.used == true) {
                throw "Voucher already used!";
              }
            }

            //validate shipping;
            let selectedShipping = productData.shippingOptions[shippingOption];
            if (!selectedShipping) {
              throw "invalid shipping option";
            }

            //calculate price;
            let totalPrice = 0;
            if (voucherDoc) {
              totalPrice = selectedShipping.price;
            } else {
              totalPrice = selectedShipping.price + productData.price;
            }

            if (userData.coins < totalPrice) {
              throw "Not enough coins!";
            }

            let newBalance = userData.coins - totalPrice;

            //product, user, and voucher exists, user has enough coins, voucher is valid for product and not used. Address appears OK.

            //create order item.
            //substract coins.
            //mark voucher as used.
            transaction.create(db.collection("orders").doc(), {
              user: uid,
              time: admin.firestore.FieldValue.serverTimestamp(),
              productId: productId,
              status: "new",
              trackingId: null,
              shippingOption: selectedShipping,
              usedVoucher: voucherDoc ? true : false,
              voucherId: voucherDoc ? voucherId : null,
              totalPrice: totalPrice,
              address: address
            });
            transaction.update(userRef, {
              coins: newBalance,
              address: saveAddress ? address : userData.address
            });
            if (voucherDoc) {
              transaction.update(voucherRef, { used: true });
            }

            totalPrice > 0 && logTransaction(uid, "Buy product", -totalPrice);
            return { status: "ok", totalPrice: totalPrice };
          };
          if (voucherRef) {
            return transaction.get(voucherRef).then(v => completeOrder(v));
          } else {
            return completeOrder();
          }
        });
      })
      .catch(err => {
        console.log("error!");
        return { error: true, text: err };
      });
  });
});
