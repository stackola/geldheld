import React, { Component } from "react";
import { Text, View } from "react-native";
import style from "../../../style";

export default class Title extends Component {
  render() {
    return <Text style={style.containerHeadline}>{this.props.text}</Text>;
  }
}
