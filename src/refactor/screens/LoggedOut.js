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
  signInWithGoogle() {
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
              this.props.navigation.navigate("AuthLoading");
            },
            error => {
              console.log("Account linking error", error);
            }
          );
      })
      .catch(e => {
        console.error(e);
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
            text="Log in with Google"
            icon={<Icon name="google" color={colors.text} size={40} />}
          />
          <ColorButton
            hue={200}
            onPress={() => {
              this.anonSignin();
            }}
            text="Anonymous account"
            icon={<Icon name="account" color={colors.text} size={40} />}
          />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Inventory;
