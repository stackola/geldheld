import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import style from "../../style";
import Title from "./Title";
export default class Well extends Component {
  render() {
    let h = this.props.hue || Math.random() * 255;
    let l = this.props.l || 50;
    let s = this.props.sat || 35;
    return (
      <LinearGradient
        colors={[
          "hsla(" + h + ", " + s + "%, " + l + "%, 1)",
          "hsla(" + h + ", " + s + "%, " + (l + 10) + "%, 1)",
          "hsla(" + h + ", " + s + "%, " + (l + 10) + "%, 1)",
          "hsla(" + h + ", " + s + "%, " + l + "%, 1)"
        ]}
        style={{
          borderColor: "hsla(240, 35%, 11%, 1)",
          borderBottomWidth: 2,
          borderTopWidth: 2,
          marginBottom: 0,
          ...this.props.style
        }}
      >
        {this.props.static ? (
          <View style={{ flexDirection: "row", paddingTop: style.space / 2 }}>
            {this.props.children}
          </View>
        ) : (
          <ScrollView
            style={{
              paddingTop: style.space,
              paddingBottom: style.space
            }}
            horizontal={true}
          >
            {this.props.children}
          </ScrollView>
        )}
      </LinearGradient>
    );
  }
}
