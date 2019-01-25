import * as types from "./types";
import firebase from "react-native-firebase";
//We have to define action types in types.js, here we make them available as functions that can be mapped to props.
export function setUserObject(user) {
  return {
    type: types.SET_USER_OBJECT,
    payload: user
  };
}

export function userSubscribe(cb) {
  let uid = firebase.auth().currentUser.uid;
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot(doc => {
        console.log(doc);
        if (!doc.exists) {
          dispatch(setUserObject({}));
        } else {
          dispatch(setUserObject(doc._data));
          cb && 
          cb();
        }
      });
  };
}

/*
Example of an async function
export function click(id){
	return (dispatch, getState) => {
		let state=getState();		
		state.socket.socket.get('/user/click/14', function(body, jwr){
			//Dispatch redux action.
			dispatch(setUsername(body.username));
		} );
	}
}
*/
