import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import colors from "../../colors";
import Wrapper from "./Wrapper";
import Header from "./Header";
export default class LoadingScreen extends Component {
  render() {
    return (
      <Wrapper>
        <Header/>
      </Wrapper>
    );
  }
}
