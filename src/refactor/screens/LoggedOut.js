import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import Challenge from "../components/Challenge";
import ColorButton from "../components/ColorButton";

import { GoogleSignin } from "react-native-google-signin";

import firebase from "react-native-firebase";

import Entypo from "react-native-vector-icons/Entypo";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";

export class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStates: {}
    };
  }
  setLoginState(key, value, cb) {
    this.setState(
      { loginStates: { ...this.state.loginStates, [key]: value } },
      () => {
        cb && cb();
      }
    );
  }

  signInWithGoogle() {
    this.setLoginState("google", "loading", () => {
      GoogleSignin.configure();

      GoogleSignin.signIn()
        .then(data => {
          console.log("done");
          const credential = firebase.auth.GoogleAuthProvider.credential(
            data.idToken,
            data.accessToken
          );

          firebase
            .auth()
            .signInWithCredential(credential)
            .then(
              usercred => {
                this.setLoginState("google", "done");
                this.props.navigation.navigate("AuthLoading");
              },
              error => {
                console.log("Account linking error", error);
                this.setLoginState("google", "error");
              }
            );
        })
        .catch(e => {
          console.error(e);
          this.setLoginState("google", "error");
        });
    });
  }
  anonSignin() {
    this.props.navigation.navigate("AuthLoading");
  }
  render() {
    return (
      <Wrapper>
        <Header title="Choose a login method." hideRight />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: style.space }} />
          <ColorButton
            hue={11}
            onPress={() => {
              this.signInWithGoogle();
            }}
            loading={this.state.loginStates["google"] == "loading"}
            center
            done={this.state.loginStates["google"] == "done"}
            error={this.state.loginStates["google"] == "error"}
          >
            <Icon name="google" color={colors.text} size={20} /> Log in with
            Google
          </ColorButton>
          <ColorButton
            hue={200}
            onPress={() => {
              this.anonSignin();
            }}
            center
            text="Anonymous account"
          >
            <Icon name="account" color={colors.text} size={20} /> Anonymous
            account
          </ColorButton>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Inventory;
