import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { ActionCreators } from "../redux/actions";
import { bindActionCreators } from "redux";

import firebase from "react-native-firebase";

import LoadingScreen from "../components/LoadingScreen";
import { setToken } from "../lib";

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
