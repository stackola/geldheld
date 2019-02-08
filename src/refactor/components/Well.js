import React, { Component } from "react";
import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import style from "../../style";
export default class Well extends Component {
  render() {
    return (
      <LinearGradient
        colors={[
          "hsla(240, 35%, 12%, 1)",
          "hsla(240, 35%, 14%, 1)",
          "hsla(240, 35%, 14%, 1)",
          "hsla(240, 35%, 12%, 1)"
        ]}
        style={{
          height: 100,
          borderColor: "hsla(240, 35%, 11%, 1)",
          borderBottomWidth: 2,
          borderTopWidth: 2,
          marginBottom: style.space
        }}
      />
    );
  }
}
