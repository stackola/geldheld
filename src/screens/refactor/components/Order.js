import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import StandardBox from "../components/StandardBox";

import style from "../../../style";
import Coins from "./Coins";
import Title from "./Title";
import { format } from "date-fns";
import colors from "../../../colors";
import SText from "./SText";

export default class Order extends Component {
  render() {
    return (
      <StandardBox>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title>Order #9Aui7</Title>
          <View style={{ flex: 1 }} />

          <Text
            style={{
              color: colors.textMinor,
              textAlign: "right",
              fontSize: 11
            }}
          >
            {format(new Date(), "YYYY/MM/DD")} {format(new Date(), "HH:mm")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title>Status: </Title>
          <View style={{ flex: 1 }} />
          <SText color={colors.green}>New</SText>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title>Tracking #: </Title>
          <View style={{ flex: 1 }} />
          <SText>243j0fi39f99</SText>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title style={{ paddingRight: style.space / 2 }}>
            Shipping method:
          </Title>
          <View style={{ flex: 1 }} />
          <SText style={{}}>Free Shipping</SText>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }} />
          <SText color={colors.textMinor} style={{ fontSize: 11 }}>
            (4-5 Weeks)
          </SText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: style.space / 2,
            marginBottom: style.space / 2
          }}
        >
          <Title>Contains:</Title>
          <View style={{ flex: 1 }} />
          <Title>LED Lighter</Title>
          <View
            style={{
              borderRadius: 4,
              overflow: "hidden",
              marginLeft: style.space
            }}
          >
            <Image
              source={{ uri: "https://i.imgur.com/xBjQ6Ld.png" }}
              style={{
                height: 60,
                width: 60,
                backgroundColor: "white",
                borderRadius: 4,
                overflow: "hidden"
              }}
              resizeMode={"contain"}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title>Total Price: </Title>
          <View style={{ flex: 1 }} />
          <Coins amount={1000} />
        </View>
      </StandardBox>
    );
  }
}
