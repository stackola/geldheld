import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import colors from "../colors";
import UserButton from "../atoms/UserButton";

export default class Header extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.headerBackground,
          height: 60,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          flexDirection: "row"
        }}
      >
        <View style={{ width: 8 }} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: colors.background, fontSize: 17, fontWeight:"bold" }}>
            {this.props.title}
          </Text>
        </View>
        <UserButton/>
      </View>
    );
  }
}
