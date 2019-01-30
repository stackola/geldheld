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
          height: 120,
          marginBottom: 8,
          backgroundColor: "white",
          borderRadius: 4,
          overflow: "hidden",
          marginLeft: 8,
          marginRight: 8,
          flexDirection: "row",
          padding: 4
        }}
      >
        <Image
          source={{ uri: props.image }}
          style={{ width: 120, marginRight: 4 }}
          resizeMode={"contain"}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.background, fontWeight: "bold" }}>
              {props.name}
            </Text>
            <Text style={{}}>{props.text}</Text>
          </View>
          <View>
            <Text style={{ textAlign: "right", fontWeight: "bold" }}>
              {props.price} <Icon name="coin" color={colors.action} size={14} />
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ShopItemSquare;
