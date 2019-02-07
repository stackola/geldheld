import React, { Component } from "react";
import { Text, View } from "react-native";
import style from "../../../style";

export default class SText extends Component {
  render() {
    return <Text style={style.text}>{this.props.text}</Text>;
  }
}
