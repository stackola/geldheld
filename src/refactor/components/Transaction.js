import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import StandardBox from "../components/StandardBox";

import style from "../../style";
import Coins from "./Coins";
import colors from "../../colors";
import { format } from "date-fns";

export default class Transaction extends Component {
  render() {
    let color = this.props.amount >= 0 ? colors.green : colors.red;
    if (this.props.loading) {
      return (
        <StandardBox
          loading
          loadingHeight={35}
          style={{ marginTop: style.space }}
        />
      );
    }
    return (
      <StandardBox
        noPadding
        style={{ flexDirection: "row", alignItems: "center" }}
      >
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
        <View
          style={{
            flex: 1,
            padding: style.containerPadding,
            paddingTop: style.containerPadding,
            paddingBottom: style.containerPadding
          }}
        >
          <Text style={[style.containerHeadline, {}]}>{this.props.text}</Text>
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
            {format(this.props.time, "YYYY/MM/DD")}
            {"\n"}
            {format(this.props.time, "HH:mm")}
          </Text>
        </View>
      </StandardBox>
    );
  }
}
