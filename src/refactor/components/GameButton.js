import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../../colors";
import style from "../../style";

import LinearGradient from "react-native-linear-gradient";
import Title from "./Title";

export class GameButton extends Component {
  render() {
    let h = this.props.hue;
    let color1 = "hsla(" + h + ", 100%, 25%, 1)";
    let color2 = "hsla(" + h + ", 100%, 40%, 1)";
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.routeName) {
            this.props.navigation.navigate(this.props.routeName);
          }
        }}
        style={{
          flex: 1
        }}
      >
        <LinearGradient
          colors={[color1, color2, color2, color1]}
          useAngle={true}
          angle={15}
          style={{
            borderRadius: style.bigBorderRadius,
            marginRight: style.space,
            marginBottom: style.space
          }}
        >
          <View
            style={{
              flex: 1,
              padding: style.containerPadding,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={{ uri: this.props.image }}
              style={{ height: 80, width: 80 }}
              resizeMode={"contain"}
            />
          </View>
          <View
            style={{
              height: 40,
              backgroundColor: colors.darkTransparent,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Title>{this.props.title}</Title>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default GameButton;
