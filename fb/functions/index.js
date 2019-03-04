const functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

const defaultBalance = 10;

let startDucks = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  3
];

exports.makeUser = functions.auth.user().onCreate(user => {
  let uid = user.uid;
  // make a user record.
  return db
    .collection("users")
    .doc(uid)
    .set(
      {
        id: uid,
        address: "",
        coins: defaultBalance,
        time: admin.firestore.FieldValue.serverTimestamp(),
        boughtProducts: [],
        reviewedProducts: [],
        notificationsEnabled: true
      },
      { merge: true }
    );
});
exports.iapNotification = functions.pubsub.topic("iap").onPublish(message => {
  console.log("got that in app push", message);
});
exports.setFriend = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }
  //let uid = "1SXMEoviHiPEXx44TXm7yWhj15F3";

  let friendId = data.friendId;
  if (uid == friendId) {
    return { error: true, text: "Can't invite yourself." };
  }
  var userRef = db.collection("users").doc(uid);
  var friendRef = db.collection("users").doc(friendId);
  return db.runTransaction(transaction => {
    return transaction
      .get(userRef)
      .then(userDoc => {
        let userData = userDoc.data();
        if (userData.friend || userData.friend === false) {
          return { result: "user already has a friend" };
        }
        if (friendId == "no") {
          transaction.set(userRef, { friend: false }, { merge: true });
          return { status: "ok" };
        }
        // find friend;
        return transaction.get(friendRef).then(friendDoc => {
          if (!friendDoc.exists) {
            transaction.set(userRef, { friend: false }, { merge: true });
            throw "User does not exist";
          }
          transaction.set(userRef, { friend: friendId }, { merge: true });
          transaction.create(friendRef.collection("friends").doc(uid), {
            user: uid,
            id: uid,
            time: admin.firestore.FieldValue.serverTimestamp(),
            earned: 0
          });
          return { status: "ok" };
        });
      })
      .then(r => {
        return r;
      })
      .catch(e => {
        console.error(e);
        return { error: true, text: e };
      });
  });
});
exports.setToken = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "BJfqbecAOiTebHd4ZYYoopltey2";

  let token = data.token;
  var userRef = db.collection("users").doc(uid);
  return userRef
    .set({ token: token }, { merge: true })
    .then(() => {
      return { status: "ok" };
    })
    .catch(e => {
      return { error: true };
    });
});

exports.updateAddress = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "BJfqbecAOiTebHd4ZYYoopltey2";

  let address = data.address;
  var userRef = db.collection("users").doc(uid);
  return userRef
    .set({ address: address }, { merge: true })
    .then(() => {
      return { status: "ok" };
    })
    .catch(e => {
      return { error: true };
    });
});

exports.enableNotifications = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "BJfqbecAOiTebHd4ZYYoopltey2";

  let token = data.token;
  var userRef = db.collection("users").doc(uid);
  return userRef
    .set({ token: token, notificationsEnabled: true }, { merge: true })
    .then(() => {
      return { status: "ok" };
    })
    .catch(e => {
      return { error: true };
    });
});

exports.disableNotifications = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "BJfqbecAOiTebHd4ZYYoopltey2";

  var userRef = db.collection("users").doc(uid);
  return userRef
    .set({ notificationsEnabled: false }, { merge: true })
    .then(() => {
      return { status: "ok" };
    })
    .catch(e => {
      return { error: true };
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
  winningItem = Object.assign({}, winningItem, {
    chance: winningItem.chance * 100
  });
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
              console.log("error!!", err);
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    })
    .then(r => {
      challengeTrigger(uid, "crateOpened", 1);
      console.log("transaction done!!!", r);
      return { status: "ok", data: r };
    })
    .catch(err => {
      console.log("errorrr!!", err);
      return { error: true, text: err };
    });
});

exports.buyCrate = functions.https.onCall((data, context) => {
  console.log("AM NOW IN FUNC!");
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "8UuBdgKlpmUUitTImczv9iLSre72";

  let crateId = data.crateId;

  console.log("Before FS init");
  console.log("Before first FS call");
  let userRef = db.collection("users").doc(uid);
  console.log("After first FS call");
  let newUserCrate = userRef.collection("crates").doc();
  console.log("After first FS doc ref");
  return db
    .collection("crates")
    .doc(crateId)
    .get()
    .then(snap => {
      console.log("After first FS snap have");
      let crate = snap.data();
      console.log("After first FS data have");
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
            let newOrder = db.collection("orders").doc();
            transaction.create(newOrder, {
              user: uid,
              id: newOrder.id,
              time: admin.firestore.FieldValue.serverTimestamp(),
              productId: productId,
              status: "new",
              trackingId: null,
              shippingOption: selectedShipping,
              usedVoucher: voucherDoc ? true : false,
              voucherId: voucherDoc ? voucherId : null,
              totalPrice: totalPrice,
              address: address,
              product: {
                name: productData.name,
                image: productData.image
              }
            });
            transaction.update(userRef, {
              coins: newBalance,
              address: saveAddress ? address : userData.address,
              boughtProducts: (userData.boughtProducts || [])
                .filter(c => {
                  return c != productId;
                })
                .concat([productId])
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

exports.review = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "BJfqbecAOiTebHd4OZYYoopltey2";

  let rating = data.rating;
  let text = data.text;
  let shippingTime = data.shippingTime;
  let productId = data.productId;
  console.log(rating, text, shippingTime, productId);

  if (rating < 0 || rating > 5) {
    return { error: true, text: "Invalid rating." };
  }

  if (text.length > 500) {
    return { error: true, text: "Too long." };
  }

  if (shippingTime.length > 140) {
    return { error: true, text: "Too long." };
  }

  //get user, check if he bought product, and has not yet reviewed it.
  let productRef = db.collection("products").doc(productId);
  var userRef = db.collection("users").doc(uid);

  return db.runTransaction(transaction => {
    return transaction
      .get(userRef)
      .then(userDoc => {
        if (!userDoc.exists) {
          throw "User not found!";
        }
        let userData = userDoc.data();
        let hasBought =
          userData.boughtProducts.filter(bp => bp == productId).length > 0;
        let hasReviewed = userData.reviewedProducts
          ? userData.reviewedProducts.filter(rp => rp == productId).length > 0
          : false;

        console.log({ hasBought, hasReviewed });
        if (!hasBought) {
          throw "Product not owned.";
        }
        if (hasReviewed) {
          throw "Already reviewed.";
        }
        return transaction.get(productRef).then(productDoc => {
          if (!productDoc.exists) {
            throw "Product not found!";
          }
          let productData = productDoc.data();
          console.log("product found");

          //create review in product, update user reviewed products.
          let nr = productRef.collection("reviews").doc();
          transaction.create(nr, {
            user: uid,
            id: nr.id,
            rating: rating,
            shippingTime: shippingTime,
            text: text,
            time: admin.firestore.FieldValue.serverTimestamp()
          });
          transaction.update(productRef, {
            rating: updateRatings(productData, rating),
            ratingCount: productData.ratingCount
              ? productData.ratingCount + 1
              : 1
          });
          transaction.update(userRef, {
            reviewedProducts: (userData.reviewedProducts || [])
              .filter(c => {
                return c != productId;
              })
              .concat([productId])
          });

          return { status: "ok" };
        });
      })
      .catch(err => {
        console.error("Error", err);
        return { error: true, text: err };
      });
  });
});

function updateRatings(p, r) {
  let oldRating = p.rating || 0;
  let oldCount = parseInt(p.ratingCount) || 0;
  let newRating = (oldRating * oldCount + r) / (oldCount + 1);
  return newRating;
}

exports.validate = functions.https.onCall((data, context) => {
  const { google } = require("googleapis");
  const publisher = google.androidpublisher("v2");
  const authClient = new google.auth.JWT({
    email: "diese-service-acct@geldheld-746c9.iam.gserviceaccount.com",
    key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrPdZX5BdwVyzU\nYN7IKgKdVc18m0o3tfla2mDK/+JOjHdHZPeiiQpxuMkCyS5Qk6u9P5b2x/Dc56c4\n5kLaafV8S2lUhoVUNg8GvzL6NLe60YIpgf+8HCwWPs0Pe9sq2EWYiCjswUMUQUCj\np3H0t8a6lGaSsn4Jdce4l2wo3HUInooejX0sks/tllXKiY8bLKU4NvXT8nW3OIrX\n/3t1dRjoSfZImkYvC0I5lvMmyH6DT9nHQbHwSNHlzfGRV49quYZmlK2ent+cTJof\nXExw73mMstlsaDgWccqh+9zyVcrih9D7GiglUOTwNdSQ5jgkg3T+wD6AwIraIM/J\nz0jJ53IPAgMBAAECggEAR2hs9o++GnGv1wxiOnQSTQvXuauEIoE272T7UgusknbO\n0q3O+i9NdKjK4eeE8cLyreNTj6tGzMepGvgiTrQ6008bKE1EUh6M25JlrqLHLxdo\nwOhd/VJ+K/SaTGeouFAhjX7SGhBpaYvgaZ5MzfDI5Us3Dttx5X4A///c8ZklEKdj\nof7A7yZLKRXYq5FyhdXrKF4DJmHYA6VKZ+QRnqZndDmWNvTxSl8mRKf0+Yo3TJ2g\nXsJk8E0KNOUTtiRTSjcr/DUQnYyfmGscFHhajzg59nnzwkfP1io4FTcSbmnZxLwm\nWbuoII7QytzCvukJpCCMZcp4bcOlRWJeYLW5UXs8EQKBgQDxuf7BPTn12SMAlXyh\n5Zrm/mJlw14z/TsSRmQSVAa/EeBeBSpLbqjdbh3hTXJNbjFw64JuYsWszmhntmOl\nJyczwnGOcQq8m68ZkKmOaUmjGy+e83qiV/erRfrKpN+VvNn4mKKt11QYKpvd41zV\nsTE6AaUexokbdayRM5H9VfKNJwKBgQC1Wl8jq3W4F3UWOgrMouj9kxSrAGR1+3lt\nsQx9B4odX/ZMJhHASXiimjLYo1KknIiipriIFktbjcAT1++ohNa/1SpWF86FoXbu\now8J1ZmhXIo5PjobCp+lTuqj2QXpBc/p2LEbX7+eV0u7MsebTJ96WwYtL6KsDhTL\nJJ89RztU2QKBgQC56to7+kFoC7fWLSOMybIYVDOOHXOI/Q3AAo/ZYPNHZhJxffuH\nxPbwSE+HCDAPyd8RALJzAFkVjjPTAP8m+TQ3pSf97IfbhMpqGU+wDt7qKnC4CoCZ\n+JqvCsXXsnOdEYF8qLkGiAVQCQWU5dhzKzO3b6h2QTEXA6zUiRuSA9boJQKBgG83\n/SDjBk7gE+6NqhHV1w2sJgC5POMeVlnvOrly5kEdmO8aaciDRnhyGLzDbOuHFESr\n+n97LLv5MtL4mwG+dfUvxccG0qEhZM71MUPWu2E6X4q7nub2nPHEdCIH9pfx+JBx\nVCx1jA6PeuJTQhb75tIjAKa1kA30lMwAqafrB3gBAoGATAl2oA1txlrO3LFiRqB0\n5OxeXG07Pt27ICSIPCehQAJRPM1XhT96LElEmC6B9YWpz0TIK4ckLS7/53Gz4zEq\nmSp2wr7Ru2adUJzAdc3d/vpGzbAYwwPF+dcbZOIeDS4xZYymWLksrm+DP53qKzaZ\nsgnh7U+caylXrCmFhxFsSTo=\n-----END PRIVATE KEY-----\n",
    scopes: ["https://www.googleapis.com/auth/androidpublisher"]
  });
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }
  //let uid = "AqQVcObSssQRkAc5nYTOb2oSbBI3";

  const orderId = data.transactionId;
  const package_name = "com.stackola.geldheld"; //TODO
  const sku = data.productId;
  const my_token = data.purchaseToken;

  //check db for orderId. if exists, just return consume.

  //if not exists, check with playstore. if orderId match, status=0, write to db. return consume.

  var userRef = db.collection("users").doc(uid);
  return db
    .collection("iaps")
    .where("orderId", "==", orderId)
    .get()
    .then(snap => {
      if (snap.size > 0) {
        return { status: "ok", text: "Purchase already tracked." };
      } //validate with playstore
      return authClient.authorize().then(result => {
        console.log("logged in", result);
        return publisher.purchases.products
          .get({
            auth: authClient,
            packageName: package_name,
            productId: sku,
            token: my_token
          })
          .then((response, body) => {
            // Result Status must be equals to 200 so that the purchase is valid
            if (response.status === 200) {
              console.log(response);
              //return event.ref.child('is_validated').set(true);
              console.log("ayy legit!");
              //get contents of the IAP.
              //in TX: give content to user, store purchase.
              //return consume.
              return db
                .collection("iapItems")
                .doc(sku)
                .get()
                .then(itemDoc => {
                  if (!itemDoc.exists) {
                    throw "Item not found.";
                  }
                  let itemData = itemDoc.data();
                  console.log("got item", itemData);

                  return db.runTransaction(transaction => {
                    return transaction.get(userRef).then(userDoc => {
                      let userData = userDoc.data(); //?
                      itemData.contents.map(i => {
                        let newUserCrate = userRef.collection("crates").doc();
                        transaction.create(newUserCrate, {
                          crateId: i.crateId,
                          time: admin.firestore.FieldValue.serverTimestamp(),
                          price: 0,
                          opened: false,
                          id: newUserCrate.id
                        });
                      });
                      transaction.create(db.collection("iaps").doc(), {
                        orderId: orderId,
                        sku: sku,
                        token: my_token,
                        user: uid
                      });
                      return { status: "ok" };
                    });
                  });
                });
            } else {
              console.log("not found that!!");
              throw "not found!";
              //return event.ref.child('is_validated').set(false);
            }
          });
      });
    })
    .catch(e => {
      console.log("error with IAP", e);
      return { error: true };
    });

  console.log({ orderId, package_name, sku, my_token });
});

exports.duckGame = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    return { error: true, uid, text: "Not authenticated" };
  }

  //let uid = "AqQVcObSssQRkAc5nYTOb2oSbBI3";

  var userRef = db.collection("users").doc(uid);
  let bet = data.betSize;
  let selectedDucks = data.selectedDucks;

  if (!selectedDucks || selectedDucks.length < 1) {
    return { error: true, text: "no ducks selected" };
  }

  if (bet < 5 || bet > 1000) {
    return { error: true, text: "invalid betsize" };
  }

  let totalBet = bet * selectedDucks.length;
  let shuffledDucks = shuffle(startDucks);

  //calculate win.
  let totalWin = 0;
  selectedDucks.map(duck => {
    let d = shuffledDucks[duck.row * 8 + duck.col];
    console.log(d);
    if (d == 0) {
      totalWin += 0;
    }
    if (d == 1) {
      totalWin += 2;
    }
    if (d == 2) {
      totalWin += 5;
    }
    if (d == 3) {
      totalWin += 10;
    }
  });
  let totalPayout = totalWin * bet;
  let addCoins = totalPayout - totalBet;
  console.log({
    bet,
    selectedDucks,
    totalBet,
    addCoins,
    totalWin,
    totalPayout: totalPayout
  });

  return db
    .runTransaction(transaction => {
      return transaction.get(userRef).then(userDoc => {
        let userData = userDoc.data(); //?
        if (userData.coins < totalBet) {
          throw "not enough coins.";
        }
        //credit / uncredit coins
        //mark transaction

        var newCoins = userDoc.data().coins + addCoins;
        transaction.update(userRef, { coins: newCoins });
      });
    })
    .then(() => {
      logTransaction(uid, "Pick-a-duck fee", -totalBet);
      if (totalPayout > 0) {
        logTransaction(uid, "Pick-a-duck prize", totalPayout);
      }
      return {
        status: "ok",
        shuffledDucks: shuffledDucks,
        totalPayout: totalPayout
      };
    })
    .catch(e => {
      console.error("Error in playDuck", e);
      return { error: true };
    });
});

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function challengeTrigger(uid, trigger, amount) {
  //fetch all active challenges for user with this trigger.

  var userRef = db.collection("users").doc(uid);
  return db.runTransaction(transaction => {
    return transaction
      .get(
        db
          .collection("challenges")
          .where("active", "==", true)
          .where("trigger", "==", trigger)
      )
      .then(challenges => {
        challenges = challenges.docs;
        // get user progress?
        return transaction
          .get(
            db
              .collection("users")
              .doc(uid)
              .collection("challenges")
          )
          .then(userChallenges => {
            return transaction.get(userRef).then(userDoc => {
              let userData = userDoc.data();

              userChallenges = userChallenges.docs;
              challenges.map(c => {
                let userChallenge = userChallenges.filter(uc => {
                  return uc.id == c.id;
                });
                userChallenge = userChallenge[0] ? userChallenge[0] : null;
                let newNextStep = userChallenge
                  ? userChallenge.data().nextStep
                  : 0;
                //get challenge step.
                let currentStep = userChallenge
                  ? c
                      .data()
                      .steps.filter(
                        a => a.order == userChallenge.data().nextStep
                      )
                  : c.data().steps.filter(a => a.order == 0);
                console.log(currentStep[0]);
                currentStep = currentStep[0];
                if (!currentStep) {
                  console.log("no further steps.");
                  return;
                }
                //update user challenge
                let newProgress = userChallenge
                  ? userChallenge.data().progress + amount
                  : amount;

                if (newProgress >= currentStep.target) {
                  console.log("GOTTA PAY THAT USER!!");
                  currentStep.prizes.map(p => {
                    console.log("giving prize", p);
                    if (p.type == "coins") {
                      transaction.update(userRef, {
                        coins: userData.coins + p.value
                      });
                      logTransaction(uid, "Challenge prize", p.value);
                    }
                  });
                  newNextStep = currentStep.order + 1;
                }
                transaction.set(
                  userChallenge
                    ? userChallenge.ref
                    : db
                        .collection("users")
                        .doc(uid)
                        .collection("challenges")
                        .doc(c.id),
                  userChallenge
                    ? { progress: newProgress, nextStep: newNextStep }
                    : {
                        id: c.id,
                        progress: newProgress,
                        nextStep: newNextStep
                      },
                  { merge: true }
                );
              });
            });
          });
      });
  });
}
