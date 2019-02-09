import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import style from "../../style";

export default class Spacer extends PureComponent {
  render() {
    if (this.props.horizontal) {
      return <View style={{ width: this.props.size || style.space }} />;
    } else {
      return <View style={{ height: this.props.size || style.space }} />;
    }
  }
}
