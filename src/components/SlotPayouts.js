import React, { Component } from "react";
import { Text, View } from "react-native";
import colors from "../colors";

export default class SlotPayouts extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 8 }}>
        <Spacer />
        <B smiley={"️️☹️"} win={0} highlight={this.props.highlight == 0} />
        <Spacer />
        <B smiley={"️️🤔️"} win={1} highlight={this.props.highlight == 1} />
        <Spacer />
        <B smiley={"️️🙂"} win={2} highlight={this.props.highlight == 2} />
        <Spacer />
        <B smiley={"️️😀"} win={5} highlight={this.props.highlight == 3} />
        <Spacer />
        <B smiley={"️️😲"} win={10} highlight={this.props.highlight == 4} />
        <Spacer />
        <B smiley={"️️🤑"} win={50} highlight={this.props.highlight == 5} />
        <Spacer />
      </View>
    );
  }
}
function Spacer() {
  return <View style={{ width: 8 }} />;
}
function B(props) {
  return (
    <View
      style={{
        backgroundColor: !props.highlight ? "white" : colors.action,
        borderRadius: 4,
        flex: 1,
        paddingTop: 4,
        paddingBottom: 4,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: "white", fontSize: 25 }}>️{props.smiley}</Text>
      <Text style={{ fontWeight: "bold" }}>️{props.win}x</Text>
    </View>
  );
}
