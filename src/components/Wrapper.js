import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import colors from "../colors";

export default class Wrapper extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.background,
          flex: 1,
          ...this.props.style
        }}
      >
        <StatusBar
          backgroundColor={colors.headerBackground}
          barStyle={"dark-content"}
        />
        {this.props.children}
      </View>
    );
  }
}
