import React, { Component } from "react";
import { Text, View } from "react-native";

import firebase from "react-native-firebase";

import LoadingScreen from "../components/LoadingScreen";

export default class AuthLoadingScreen extends Component {
  componentDidMount() {
    this.signIn();
  }

  signIn() {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        this.props.navigation.navigate("App");
      });
  }

  render() {
    return (
      <LoadingScreen/>
    );
  }
}
