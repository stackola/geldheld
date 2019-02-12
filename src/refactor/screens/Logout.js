import React, { Component } from "react";
import { Text, View } from "react-native";
import LoadingScreen from "../components/LoadingScreen";

import { connect } from "react-redux";
import { ActionCreators } from "../../redux/actions";
import { bindActionCreators } from "redux";

import firebase from "react-native-firebase";

export class Logout extends Component {
  componentDidMount() {
    this.props.userUnsubscribe(() => {
      this.props.configUnsubscribe(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("good logout!");
            this.props.navigation.navigate("LoggedOut");
        })
        .catch(error => {
            this.props.navigation.navigate("AuthLoading");
            console.log("bad logout!");
          });
      });
    });
  }
  render() {
    return <LoadingScreen />;
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
