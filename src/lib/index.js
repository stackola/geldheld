import firebase from "react-native-firebase";
const sendCoinFlip = firebase.functions().httpsCallable("coinflip");
const sendSlot = firebase.functions().httpsCallable("slot");
const sendBuyCrate = firebase.functions().httpsCallable("buyCrate");
const sendOpenCrate = firebase.functions().httpsCallable("openCrate");
const sendQuickSell = firebase.functions().httpsCallable("quickSell");
const sendOrder = firebase.functions().httpsCallable("order");

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
  return { routeName: "Product", params: { productId: id }, key: "prod_" + id };
}

export function navToBuy(id) {
  return {
    routeName: "BuyProduct",
    params: { productId: id },
    key: "buy_" + id
  };
}

export function navToCratePage(id) {
  return {
    routeName: "CratePage",
    params: { crateId: id },
    key: "cratePage_" + id
  };
}

export function navToUserCrate(id) {
  return {
    routeName: "SettingsMyCrate",
    params: { id: id },
    key: "myCrate_" + id
  };
}

export function order(payload){
  return sendOrder(payload);
}

export function getVouchersForProduct(productId) {
  return firebase
    .firestore()
    .collection("users")
    .doc(getUID())
    .collection("vouchers")
    .where("used", "==", false)
    .where("sold", "==", false)
    .where("productId", "==", productId)
    .get()
    .then(snap => {
      return snap._docs.map(d => d._data);
    });
}
