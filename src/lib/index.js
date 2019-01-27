import firebase from "react-native-firebase";
const sendCoinFlip = firebase.functions().httpsCallable("coinflip");
const sendSlot = firebase.functions().httpsCallable("slot");

export function flip(amount) {
  return sendCoinFlip({ bet: amount });
}

export function slot(amount) {
  return sendSlot({ bet: amount });
}
