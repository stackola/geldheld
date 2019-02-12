import * as types from "./types";
import firebase from "react-native-firebase";
//We have to define action types in types.js, here we make them available as functions that can be mapped to props.
var unsubConfigIntern = () => {
  console.log("cant do that.");
};
export function setConfig(config) {
  return {
    type: types.SET_CONFIG,
    payload: config
  };
}

export function configSubscribe(cb) {
  let uid = firebase.auth().currentUser.uid;
  return (dispatch, getState) => {
    unsubConfigIntern = firebase
      .firestore()
      .collection("config")
      .doc("main")
      .onSnapshot(doc => {
        console.log(doc);
        if (!doc.exists) {
          dispatch(setConfig({}));
        } else {
          dispatch(setConfig(doc._data));
          cb && cb();
        }
      });
  };
}

export function configUnsubscribe(cb) {
  unsubConfigIntern();
  cb && cb();
  return { type: "none" };
}
