import React, { Component } from "react";
import { Text, View } from "react-native";
import style from "../../style";

export default class Title extends Component {
  render() {
    return (
      <Text
        style={[
          style.containerHeadline,
          { color: this.props.color || style.containerHeadline.color },
          this.props.style || {}
        ]}
      >
        {this.props.children || this.props.text}
      </Text>
    );
  }
}
