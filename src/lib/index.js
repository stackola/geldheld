import firebase from "react-native-firebase";
const sendCoinFlip = firebase.functions().httpsCallable("coinflip");

export function flip(amount) {
  return sendCoinFlip({ bet: amount });
}
