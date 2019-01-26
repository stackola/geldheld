import React, { Component } from "react";
import { Text, View, Slider, TextInput } from "react-native";
import colors from "../colors";

export default class SizePicker extends Component {
  render() {
    return (
      <View style={{ height: 60, alignItems: "center", flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Slider
            minimumValue={5}
            value={this.props.bet}
            onValueChange={v => {
              this.props.onChange(v);
            }}
            maximumValue={100}
            step={5}
            minimumTrackTintColor={colors.action}
            thumbTintColor={colors.action}
          />
        </View>
        <View style={{ width: 100 }}>
          <TextInput
            onChangeText={t => {
              let k = parseInt(t);

              this.props.onChange(k ? k : 0);
            }}
            keyboardType={"number-pad"}
            style={{
              color: colors.action,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18
            }}
            value={this.props.bet.toString()}
          />
        </View>
      </View>
    );
  }
}
