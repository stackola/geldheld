import React, { Component } from "react";
import { Text, View } from "react-native";
import style from "../../style";
import colors from "../../colors";

export default class SText extends Component {
  render() {
    return (
      <Text
        style={[
          style.text,
          { color: this.props.color || colors.text },
          this.props.style || {}
        ]}
      >
        {this.props.children || this.props.text}
      </Text>
    );
  }
}
