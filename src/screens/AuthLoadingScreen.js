import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { ActionCreators } from "../redux/actions";
import { bindActionCreators } from "redux";

import firebase from "react-native-firebase";

import LoadingScreen from "../components/LoadingScreen";
import { setToken, setFriend } from "../lib";
import queryString from "query-string";

class AuthLoadingScreen extends Component {
  componentDidMount() {
    this.signIn();
  }

  signIn() {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        firebase
          .messaging()
          .getToken()
          .then(t => {
            console.log(t);
            if (t) {
              setToken(t);
            }
          });
        //set referrer if we have a link, otherwise set ref to false or something.!
        firebase
          .links()
          .getInitialLink()
          .then(url => {
            if (url) {
              // app opened from a url
              console.log("opened with", url);
              // set freidn!
              console.log();
              let friend = queryString.parseUrl(url).query.ref;
              setFriend(friend).then(r => console.log(r));
            } else {
              console.log("normal open!");
              // app NOT opened from a url
            }
          });
        this.props.userSubscribe();
        this.props.configSubscribe();
        this.props.navigation.navigate("App");
      });
  }

  render() {
    return <LoadingScreen />;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
