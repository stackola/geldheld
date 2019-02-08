import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StandardBox from "./StandardBox";

import colors from "../../colors";
import style from "../../style";

export default class DeleteableMessage extends Component {
  render() {
    let props = this.props;
    let o = "44";
    let color = colors.lightTransparent;
    if (props.green) {
      color = colors.green + o;
    }
    if (props.red) {
      color = colors.red + o;
    }
    if (props.orange) {
      color = colors.orange + o;
    }
    if (props.color) {
      color = props.color;
    }

    if (props.error) {
      color = colors.error + o;
    }
    return (
      <StandardBox
        style={{
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: color
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={style.containerHeadline}>New Crate!</Text>
          <Text style={[style.text, { marginBottom: 4 }]}>
            You have received one crate while you were away!
          </Text>
        </View>
        <TouchableOpacity style={{ paddingLeft: 30, height: "100%" }}>
          <Icon name="close-circle" color={colors.text} size={20} />
        </TouchableOpacity>
      </StandardBox>
    );
  }
}
