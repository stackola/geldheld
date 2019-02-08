import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import style from "../../style";
import Title from "./Title";
export default class Well extends Component {
  render() {
    let h = Math.random() * 255;
    return (
      <LinearGradient
        colors={[
          "hsla(" + h + ", 35%, 50%, 1)",
          "hsla(" + h + ", 35%, 60%, 1)",
          "hsla(" + h + ", 35%, 60%, 1)",
          "hsla(" + h + ", 35%, 50%, 1)"
        ]}
        style={{
          borderColor: "hsla(240, 35%, 11%, 1)",
          borderBottomWidth: 2,
          borderTopWidth: 2,
          marginBottom: 0
        }}
      >
        <ScrollView
          style={{
            paddingTop: style.space,
            paddingBottom: style.space
          }}
          horizontal={true}
        >
          {this.props.children}
        </ScrollView>
      </LinearGradient>
    );
  }
}
