import React, { Component } from "react";
import { Text, View } from "react-native";
import SText from "../components/SText";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import Coins from "../components/Coins";

export default class ShippingOption extends Component {
  render() {
    let props = this.props;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          minHeight: 40
        }}
      >
        <SText style={{ flex: 1 }}>{props.name}</SText>
        <View
          style={{
            flex: this.props.hidePrice ? 0 : 1.5,
            justifyContent: "center"
          }}
        >
          <SText style={{ color: colors.textMinor, fontSize: 10 }}>
            {" "}
            <Icon name="close" color={"#0000"} size={10} /> {props.time}
          </SText>
          {props.tracking ? (
            <SText
              style={{
                color: colors.textMinor,
                fontSize: 10,
                alignItems: "center"
              }}
            >
              {" "}
              <Icon name="check" color={colors.green} size={10} /> Tracking
              available
            </SText>
          ) : (
            <SText
              style={{
                color: colors.textMinor,
                fontSize: 10,
                alignItems: "center"
              }}
            >
              {" "}
              <Icon name="close" color={colors.red} size={10} /> No tracking
            </SText>
          )}
        </View>
        {!this.props.hidePrice && (
          <View
            style={{
              width: 60,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Coins amount={props.price} />
          </View>
        )}
      </View>
    );
  }
}
