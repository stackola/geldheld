import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import colors from "../colors";

export default class Header extends Component {
  render() {
    return (
      <View
        style={{
          borderColor: colors.headerBorder,
          borderBottomWidth: 2,
          backgroundColor: colors.headerBackground,
          height: 60,
          elevation: 2
        }}
      >
        <StatusBar
          backgroundColor={colors.headerBackground}
          barStyle={"dark-content"}
        />
        <Text style={{ color: colors.text }}> Header </Text>
      </View>
    );
  }
}
