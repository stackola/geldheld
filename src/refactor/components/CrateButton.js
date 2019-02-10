import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../../colors";
import style from "../../style";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import Title from "./Title";
import Coins from "./Coins";
import { navToCratePage } from "../../lib";

import { withNavigation } from "react-navigation";

export class GameButton extends Component {
  pressed() {
    this.props.navigation.navigate(navToCratePage(this.props.id));
  }
  render() {
    let h = this.props.hue || 0;
    let color1 = "hsla(" + h + ", 100%, 25%, 1)";
    let color2 = "hsla(" + h + ", 100%, 40%, 1)";
    return (
      <TouchableOpacity
        disabled={this.props.noLink}
        onPress={() => this.pressed()}
        style={{
          flex: 1,
          overflow: "hidden"
        }}
      >
        <LinearGradient
          colors={[color1, color2, color2, color1]}
          useAngle={true}
          angle={15}
          style={{
            overflow: "hidden",
            flex: 1,
            borderRadius: style.bigBorderRadius,
            marginRight: this.props.noMargin ? 0 : style.space,
            marginLeft: this.props.noMargin ? 0 : style.space,
            marginBottom: this.props.noMargin ? 0 : style.space
          }}
        >
          <View
            style={{
              flex: 1,
              padding: style.containerPadding,
              alignItems: "center",
              justifyContent: "center",
              height: 80
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                position: "absolute",
                top: style.containerPadding,
                right: style.containerPadding
              }}
            >
              <Coins amount={this.props.price} />
            </View>
            <Icon name="cube-outline" color={"white"} size={50} />
          </View>
          <View
            style={{
              height: 40,
              backgroundColor: colors.darkTransparent,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Title>{this.props.name}</Title>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(GameButton);
