import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../colors";

export default class CoinSelect extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row", padding: 8 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.onSpin("heads");
          }}
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 4,
            padding: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Bet on heads</Text>
          <Image
            source={{ uri: "heads_icon" }}
            style={{ marginLeft: 4, marginRight: 4, height: 60, width: 60 }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <View style={{ width: 8 }} />
        <TouchableOpacity
          onPress={() => {
            this.props.onSpin("tails");
          }}
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 4,
            borderRadius: 4,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={{ uri: "tails_icon" }}
            style={{ marginLeft: 4, marginRight: 4, height: 60, width: 60 }}
            resizeMode={"contain"}
          />
          <Text style={{ fontWeight: "bold" }}>Bet on tails</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
