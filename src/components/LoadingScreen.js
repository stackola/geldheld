import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import colors from "../colors";
import Wrapper from "./Wrapper";
export default class LoadingScreen extends Component {
  render() {
    return (
      <Wrapper style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.indicatorColor} />
      </Wrapper>
    );
  }
}
