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
        <View style={{ width: 12 }} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: colors.background, fontSize: 15 }}>
            {this.props.title}
          </Text>
        </View>
        <UserButton/>
      </View>
    );
  }
}
