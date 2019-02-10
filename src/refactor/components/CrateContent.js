import React, { Component } from "react";
import { View } from "react-native";
import style from "../../style";
import CrateItem from "./CrateItem";

export default class CrateContent extends Component {
  render() {
    let items = this.props.items.sort((a, b) => {
      return a.order - b.order;
    });
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 1,
          justifyContent: "space-between",
          marginRight: style.space,
          marginLeft: style.space
        }}
      >
        {items.map((i, index) => {
          return <CrateItem {...i} key={index} />;
        })}
      </View>
    );
  }
}
