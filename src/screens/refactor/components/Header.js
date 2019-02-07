import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import style from "../../../style";
import colors from "../../../colors";
import UserButton from "./UserButton";
export default class Header extends Component {
  render() {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: colors.lightTransparent,
          marginTop: StatusBar.currentHeight,
          alignItems: "center",
          flexDirection: "row",
          borderColor: "hsla(240, 35%, 11%, 1)",
          borderBottomWidth: 1
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
        <View style={{ flex: 1 }} />
        <UserButton hide={false} />
      </View>
    );
  }
}
