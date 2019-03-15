import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import colors from "../../colors";
import style from "../../style";
import ColorButton from "./ColorButton";
export default class CoinSelect extends Component {
  render() {
    let props = this.props;
    let h = props.hue || 120;
    let l = props.l || 25;
    let color1 =
      "hsla(" +
      h +
      ", " +
      (this.props.sat >= 0 ? this.props.sat : 100) +
      "%, " +
      (l + 15) +
      "%, 1)";
    let color2 =
      "hsla(" +
      h +
      ", " +
      (this.props.sat >= 0 ? this.props.sat : 100) +
      "%, " +
      l +
      "%, 1)";
    return (
      <View
        style={{
          flexDirection: "row",
          marginLeft: style.space,
          marginRight: style.space
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.onSpin("heads");
          }}
          style={{
            flex: 1,
            backgroundColor: colors.action,
            borderRadius: style.smallBorderRadius,
            backgroundColor: color1,
            flexDirection: "row",
            paddingBottom: style.space / 2,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Bet on heads
          </Text>
          <Image
            source={{ uri: "heads_icon" }}
            style={{
              marginLeft: 4,
              marginRight: 4,
              height: 40,
              width: 40,
              marginTop: style.space / 2,
              marginBottom: style.space / 2
            }}
            resizeMode={"contain"}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: style.space / 2,
              borderBottomRightRadius: style.smallBorderRadius,
              borderBottomLeftRadius: style.smallBorderRadius,
              backgroundColor: color2
            }}
          />
        </TouchableOpacity>
        <View style={{ width: 8 }} />
        <TouchableOpacity
          onPress={() => {
            this.props.onSpin("tails");
          }}
          style={{
            flex: 1,
            backgroundColor: colors.action,
            borderRadius: style.smallBorderRadius,
            backgroundColor: color1,
            flexDirection: "row",
            paddingBottom: style.space / 2,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={{ uri: "tails_icon" }}
            style={{
              marginLeft: 4,
              marginRight: 4,
              height: 40,
              width: 40,
              marginTop: style.space / 2,
              marginBottom: style.space / 2
            }}
            resizeMode={"contain"}
          />
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Bet on tails
          </Text>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: style.space / 2,
              borderBottomRightRadius: style.smallBorderRadius,
              borderBottomLeftRadius: style.smallBorderRadius,
              backgroundColor: color2
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
