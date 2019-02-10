import React, { Component } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import StandardBox from "../components/StandardBox";

import colors from "../../colors";
import style from "../../style";

import Coins from "./Coins";

export default class Offer extends Component {
  render() {
    if (this.props.loading) {
      return (
        <StandardBox
          noPadding
          style={{
            flexDirection: "row",
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            marginTop: style.space
          }}
        >
          <ActivityIndicator color={colors.text} />
        </StandardBox>
      );
    }
    return (
      <StandardBox noPadding style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: this.props.image }}
          resizeMode={"cover"}
          style={{ width: 80, minHeight: 80 }}
        />
        <View
          style={{
            flex: 1,
            padding: style.containerPadding,
            paddingTop: 0,
            paddingBottom: style.containerPadding
          }}
        >
          <Text style={style.containerHeadline}>{this.props.title}</Text>
          <Text style={style.text}>{this.props.text}</Text>
        </View>
        <View
          style={{
            minWidth: 60,
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: style.space,
            flexDirection: "row"
          }}
        >
          <Coins amount={this.props.coins} />
        </View>
      </StandardBox>
    );
  }
}
