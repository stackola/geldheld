import firebase from "react-native-firebase";
const sendCoinFlip = firebase.functions().httpsCallable("coinflip");
const sendSlot = firebase.functions().httpsCallable("slot");
const sendBuyCrate = firebase.functions().httpsCallable("buyCrate");

export function getUID() {
  return firebase.auth().currentUser.uid;
}
export function flip(amount) {
  return sendCoinFlip({ bet: amount });
}

export function slot(amount) {
  return sendSlot({ bet: amount });
}

export function buyCrate(id) {
  return sendBuyCrate({ crateId: id });
}
