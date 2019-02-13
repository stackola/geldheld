import React, { Component } from "react";
import { TouchableOpacity, Text, View, Slider } from "react-native";
import StandardBox from "./StandardBox";
import Title from "./Title";
import Spacer from "./Spacer";
import Coins from "./Coins";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";

export default class BetSizeSelector extends Component {
  render() {
    return (
      <StandardBox>
        <Title style={{ textAlign: "center" }}>Select your wager</Title>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Coins amount={this.props.betSize} size={20} />
        </View>
        <Spacer />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              let newSize = this.props.betSize - 5;
              if (newSize >= 5) {
                this.props.onChange(newSize);
              }
            }}
            style={{
              width: 30,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name={"minus"} color={colors.textMinor} size={20} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Slider
              onValueChange={v => {
                this.props.onChange(v);
              }}
              minimumValue={10}
              maximumValue={1000}
              step={5}
              value={this.props.betSize}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              let newSize = this.props.betSize + 5;
              if (newSize <= 1000) {
                this.props.onChange(newSize);
              }
            }}
            style={{
              width: 30,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name={"plus"} color={colors.textMinor} size={20} />
          </TouchableOpacity>
        </View>
        <Spacer />
      </StandardBox>
    );
  }
}
