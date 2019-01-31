import firebase from "react-native-firebase";
const sendCoinFlip = firebase.functions().httpsCallable("coinflip");
const sendSlot = firebase.functions().httpsCallable("slot");
const sendBuyCrate = firebase.functions().httpsCallable("buyCrate");
const sendOpenCrate = firebase.functions().httpsCallable("openCrate");
const sendQuickSell = firebase.functions().httpsCallable("quickSell");

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

export function openCrate(id) {
  return sendOpenCrate({ crateId: id });
}

export function quickSell(id) {
  return sendQuickSell({ voucherId: id });
}

export function navToProduct(id) {
  return { routeName: "Product", params: { productId: id }, key: id };
}
