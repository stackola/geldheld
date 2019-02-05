import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";
import TabBar from "./TabBar";

export default class Wrapper extends Component {
  render() {
    return (
      <ImageBackground
        source={{ uri: "background3" }}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={{ flex: 1 }}>{this.props.children}</View>
        <TabBar />
      </ImageBackground>
    );
  }
}
