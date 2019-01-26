import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../colors";

export default class CoinSelect extends Component {
  render() {
    return (
      <View
        style={{ flexDirection: "row", borderTopWidth: 2, borderColor: "#999" }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.onSpin("heads");
          }}
          style={{
            flex: 1,
            paddingTop: 8,
            paddingBottom: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: colors.action }}>Bet on heads</Text>
          <Image
            source={{ uri: "heads_icon" }}
            style={{ marginLeft: 4, marginRight: 4, height: 60, width: 60 }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <View style={{ width: 2, backgroundColor: "#999" }} />
        <TouchableOpacity
          onPress={() => {
            this.props.onSpin("tails");
          }}
          style={{
            flex: 1,
            paddingTop: 8,
            paddingBottom: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={{ uri: "tails_icon" }}
            style={{ marginLeft: 4, marginRight: 4, height: 60, width: 60 }}
            resizeMode={"contain"}
          />
          <Text style={{ color: colors.action }}>Bet on tails</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
