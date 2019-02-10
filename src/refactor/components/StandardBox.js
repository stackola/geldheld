import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import style from "../../style";
import colors from "../../colors";
export default class StandardBox extends Component {
  render() {
    let props = this.props;
    let o = "77";
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
      <View
        style={{
          backgroundColor: color,
          borderRadius: props.noRadius ? 0 : style.bigBorderRadius,
          overflow: "hidden",
          margin: props.noMargin ? 0 : style.space,
          marginTop: 0,
          padding: props.noPadding ? 0 : style.containerPadding,
          paddingTop: props.noPadding ? 0 : style.containerPadding / 2,
          paddingBottom: props.noPadding ? 0 : style.containerPadding / 2,
          ...(this.props.style || {})
        }}
      >
        {this.props.loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: this.props.loadingHeight || 80
            }}
          >
            <ActivityIndicator color="white" />
          </View>
        ) : (
          this.props.children
        )}
      </View>
    );
  }
}
