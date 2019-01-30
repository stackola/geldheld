import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import colors from "../colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export class ShopItemSquare extends Component {
  render() {
    let props = this.props;
    return (
      <View
        style={{
          height: 150,
          width: 150,
          marginRight: 8,
          backgroundColor: "white",
          borderRadius: 4,
          overflow: "hidden"
        }}
      >
        <Image
          source={{ uri: props.image }}
          style={{ flex: 1 }}
          resizeMode={"contain"}
        />
        <View
          style={{
            minHeight: 40,
            backgroundColor: "hsla(0,0%,100%,0.8)",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 4
          }}
        >
          <Text style={{ color: colors.background, fontWeight: "bold" }}>
            {props.name}
          </Text>
          <Text style={{ textAlign: "right", fontWeight: "bold" }}>
            {props.price} <Icon name="coin" color={colors.action} size={14} />
          </Text>
        </View>
      </View>
    );
  }
}

export default ShopItemSquare;
