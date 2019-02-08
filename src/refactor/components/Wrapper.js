import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";
import TabBar from "./TabBar";
class Wrapper extends Component {
  render() {
    return (
      <ImageBackground
        source={{ uri: "background3" }}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={{ flex: 1 }}>{this.props.children}</View>
        <TabBar navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

export default Wrapper;
