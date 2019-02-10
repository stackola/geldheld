import firebase from "react-native-firebase";
const sendCoinFlip = firebase.functions().httpsCallable("coinflip");
const sendSlot = firebase.functions().httpsCallable("slot");
const sendBuyCrate = firebase.functions().httpsCallable("buyCrate");
const sendOpenCrate = firebase.functions().httpsCallable("openCrate");
const sendQuickSell = firebase.functions().httpsCallable("quickSell");
const sendOrder = firebase.functions().httpsCallable("order");
const sendReview = firebase.functions().httpsCallable("review");
const sendUpdateAddress = firebase.functions().httpsCallable("updateAddress");
const sendSetToken = firebase.functions().httpsCallable("setToken");
const sendSetFriend = firebase.functions().httpsCallable("setFriend");
const sendValidate = firebase.functions().httpsCallable("validate");
const sendEnableNotifications = firebase
  .functions()
  .httpsCallable("enableNotifications");
const sendDisableNotifications = firebase
  .functions()
  .httpsCallable("disableNotifications");

export function getUID() {
  return firebase.auth().currentUser.uid;
}
export function flip(amount) {
  return sendCoinFlip({ bet: amount });
}

export function validate(payload) {
  return sendValidate(payload);
}

export function slot(amount) {
  return sendSlot({ bet: amount });
}

export function setFriend(friendId) {
  return sendSetFriend({ friendId: friendId });
}

export function updateAddress(address) {
  return sendUpdateAddress({ address: address });
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

export function order(payload) {
  return sendOrder(payload);
}

export function review(payload) {
  return sendReview(payload);
}

export function setToken(token) {
  return sendSetToken({ token: token });
}

export function navToProduct(id) {
  return { routeName: "Product", params: { productId: id }, key: "prod_" + id };
}

export function disableNotifications() {
  return sendDisableNotifications();
}

export function enableNotifications() {
  return firebase
    .messaging()
    .getToken()
    .then(t => {
      return sendEnableNotifications({ token: t });
    });
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
    routeName: "MyCrate",
    params: { id: id },
    key: "myCrate_" + id
  };
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

export function getInviteLink() {
  const link = new firebase.links.DynamicLink(
    "https://example.com?ref=" + getUID(),
    "geldheld.page.link"
  ).android
    .setPackageName("com.stackola.geldheld")
    .ios.setBundleId("com.example.ios");

  return firebase.links().createShortDynamicLink(link, "SHORT");
}

export function formatMoney(
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}
