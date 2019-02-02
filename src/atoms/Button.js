import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import colors from "../colors";
class Button extends Component {
  pressed() {
    if (!this.props.theKey && !this.props.params) {
      this.props.navigation.navigate(this.props.path);
    } else {
      this.props.navigation.navigate({
        routeName: this.props.path,
        params: this.props.params,
        key: this.props.theKey
      });
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.pressed();
        }}
        style={{
          marginTop: 8,
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 4,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: this.props.background || "white"
        }}
      >
        <Text style={{ color: colors.background, fontWeight: "bold" }}>
          {" "}
          {this.props.title}{" "}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Button);
