import React, { PureComponent } from "react";
import { Text, View } from "react-native";

export default class Title extends PureComponent {
  render() {
    return (
      <View style={{ paddingRight: 8, paddingLeft: 8, paddingTop: 4 }}>
        <Text style={{ color: "white", fontSize: 18 }}>{this.props.text}</Text>
      </View>
    );
  }
}
