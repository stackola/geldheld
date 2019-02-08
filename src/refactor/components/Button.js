import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import style from "../../style";
import colors from "../../colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Button extends Component {
  render() {
    let props = this.props;
    let o = "99";
    let color = "#777777";
    if (props.green) {
      color = colors.green;
    }
    if (props.red) {
      color = colors.red;
    }
    if (props.orange) {
      color = colors.orange;
    }
    if (props.color) {
      color = props.color;
    }

    if (props.error) {
      color = colors.error;
    }
    return (
      <TouchableOpacity
        style={{
          height: 50,
          flex: props.noFlex || props.inLine ? 0 : 1,
          margin: style.space,
          marginTop: 0,
          marginBottom: style.space,
          overflow: "hidden",
          borderRadius: style.smallBorderRadius
        }}
      >
        <LinearGradient
          colors={[color, color, color + o, color + o]}
          locations={[0.87, 0.88, 0.89, 1]}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {!props.loading && !props.error && !props.done && (
            <Text
              style={{
                color: "white",
                fontWeight: "bold"
              }}
            >
              {this.props.children || this.props.title}
            </Text>
          )}
          {props.error && <Icon name="alert" color="white" size={20} />}
          {props.done && <Icon name="check" color="white" size={20} />}
          {props.loading && <ActivityIndicator color={"white"} />}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
