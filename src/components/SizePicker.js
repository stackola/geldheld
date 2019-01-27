import React, { Component } from "react";
import { Text, View, Slider, TextInput } from "react-native";
import colors from "../colors";

export default class SizePicker extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 4
        }}
      >
        <Text style={{ textAlign: "center", marginTop: 4, fontWeight: "bold" }}>
          Bet size
        </Text>

        <View
          style={{
            height: 50,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
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
          <View style={{ width: 80 }}>
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
      </View>
    );
  }
}
