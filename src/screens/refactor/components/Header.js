import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import style from "../../../style";
import colors from "../../../colors";
export default class Header extends Component {
  render() {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: colors.lightTransparent,
          marginTop: StatusBar.currentHeight,
          justifyContent: "center"
        }}
      >
        <StatusBar
          translucent={true}
          backgroundColor={colors.lightTransparent}
          barStyle={"light-content"}
        />
        <Text
          style={{
            fontWeight: "100",
            color: "#eee",
            marginLeft: style.space + style.containerPadding,
            fontSize: 20,
            fontFamily: "sans-serif-light"
          }}
        >
          Home
        </Text>
      </View>
    );
  }
}
