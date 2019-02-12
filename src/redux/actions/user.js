import * as types from "./types";
import firebase from "react-native-firebase";
//We have to define action types in types.js, here we make them available as functions that can be mapped to props.
var unsubUserIntern = () => {
  console.log("cant do that.");
};
export function setUserObject(user) {
  return {
    type: types.SET_USER_OBJECT,
    payload: user
  };
}

export function userSubscribe(cb) {
  let uid = firebase.auth().currentUser.uid;
  return (dispatch, getState) => {
    unsubUserIntern = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot(doc => {
        console.log(doc);
        if (!doc.exists) {
          dispatch(setUserObject({}));
        } else {
          dispatch(setUserObject(doc._data));
          cb && cb();
        }
      });
  };
}

export function userUnsubscribe(cb) {
  unsubUserIntern();
  cb && cb();
  return setUserObject({ coins: 0 });
}
