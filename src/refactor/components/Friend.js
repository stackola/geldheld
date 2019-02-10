import React, { Component } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import StandardBox from "../components/StandardBox";

import Coins from "./Coins";
import { format } from "date-fns";
import Title from "./Title";

import colors from "../../colors";
import style from "../../style";

export default class Friend extends Component {
  render() {
    let color = this.props.amount >= 0 ? colors.green : colors.red;
    return this.props.loading ? (
      <StandardBox
        noPadding
        style={{ flexDirection: "row", marginTop: style.space }}
      >
        <View
          style={{
            flex: 1,
            padding: style.containerPadding,
            paddingTop: style.containerPadding,
            paddingBottom: style.containerPadding,
            justifyContent: "center",
            flexDirection: "row",
            height: 50
          }}
        >
          <ActivityIndicator color={"white"} />
        </View>
      </StandardBox>
    ) : (
      <StandardBox
        noPadding
        style={{ flexDirection: "row", alignItems: "center", minHeight: 50 }}
      >
        <View
          style={{
            flex: 1,
            padding: style.containerPadding,
            paddingLeft: style.space,
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
            {format(new Date(), "YYYY/MM/DD")}
            {"\n"}
            {format(new Date(), "HH:mm")}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: style.containerPadding,
            flexDirection: "row",
            minWidth: 70
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
