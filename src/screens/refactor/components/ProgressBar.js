import React, { Component } from "react";
import { Text, View } from "react-native";
import colors from "../../../colors";
import style from "../../../style";

export default class ProgressBar extends Component {
  render() {
    let items = [];
    for (let i = 0; i < this.props.total; i++) {
      items.push(<Item completed={i < this.props.complete} key={i} />);
    }
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: style.space,
            marginBottom: style.space
          }}
        >
          {items}
        </View>
      </View>
    );
  }
}

let Item = p => {
  return (
    <View
      style={{
        backgroundColor: p.completed ? colors.green : "#7779",
        height: 15,
        marginRight: 2,
        marginLeft: 2,
        flex: 1,
        borderRadius: 6
      }}
    />
  );
};
