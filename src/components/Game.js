import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
class Game extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(this.props.path);
        }}
        style={{
          height: 100,
          backgroundColor: "white",
          marginTop: 8,
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 4
        }}
      >
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Game);
