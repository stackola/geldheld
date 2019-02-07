import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import StandardBox from "../components/StandardBox";

import style from "../../../style";
import Coins from "./Coins";
import colors from "../../../colors";
import { format } from "date-fns";
import Title from "./Title";

export default class Friend extends Component {
  render() {
    let color = this.props.amount >= 0 ? colors.green : colors.red;
    return (
      <StandardBox
        noPadding
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            flex: 1,
            padding: style.containerPadding,
            paddingTop: style.containerPadding,
            paddingBottom: style.containerPadding
          }}
        >
          <Title>Friend #1</Title>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: style.space,
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              color: colors.textMinor,
              textAlign: "center",
              fontSize: 11
            }}
          >
            {format(new Date(), "YYYY/MM/DD")} {format(new Date(), "HH:mm")}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: style.space,
            flexDirection: "row",
            minWidth: 80
          }}
        >
          <Text
            style={{
              color: color
            }}
          >
            {this.props.amount >= 0 ? "+" : "-"}{" "}
            <Coins amount={Math.abs(this.props.amount)} color={color} />
          </Text>
        </View>
      </StandardBox>
    );
  }
}
