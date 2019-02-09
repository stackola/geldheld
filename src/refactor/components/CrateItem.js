import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import style from "../../style";
import colors from "../../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SText from "./SText";
import { formatMoney } from "../../lib";

export default class CrateItem extends Component {
  render() {
    let props = this.props;
    let rarity = props.rarity || 0;
    return (
      <View
        style={{
          width: props.width || "32%",
          height: 80,
          backgroundColor: props.color || colors.lightTransparent,
          borderRadius: style.smallBorderRadius,
          marginBottom: props.margin || style.space / 2,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        {props.type == "crate" && (
          <React.Fragment>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Icon
                name="cube-outline"
                color={"hsla(" + (this.props.hue || 0) + ", 100%, 40%, 1)"}
                size={30}
              />
            </View>
            <SText
              style={{ marginBottom: style.containerPadding, fontSize: 12 }}
            >
              {props.name}
            </SText>
          </React.Fragment>
        )}
        {props.type == "coins" && (
          <React.Fragment>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Icon name={"coin"} color={colors.coin} size={30} />
            </View>
            <SText
              style={{ marginBottom: style.containerPadding, fontSize: 12 }}
            >
              {formatMoney(props.amount)} coins
            </SText>
          </React.Fragment>
        )}
        {props.type == "product" && (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                width: "100%",
                padding: 2,
                backgroundColor: "white"
              }}
            >
              <Image
                style={{ flex: 1, width: "100%", backgroundColor: "white" }}
                resizeMode={"contain"}
                source={{ uri: props.image }}
              />
            </View>
            <SText
              style={{
                marginBottom: style.containerPadding,
                fontSize: 12,
                textAlign: "center",
                paddingTop: 2
              }}
            >
              {props.name}
            </SText>
          </View>
        )}
        <View
          style={{
            height: 4,
            backgroundColor: colors.rarity[rarity],
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0
          }}
        />
        <View
          style={{
            position: "absolute",
            top: style.containerPadding,
            right: style.containerPadding
          }}
        >
          <SText
            style={{
              textAlign: "center",
              color:
                props.type == "product" ? colors.textDark : colors.textMinor,
              fontSize: 11
            }}
          >
            {props.chance}%
          </SText>
        </View>
      </View>
    );
  }
}
