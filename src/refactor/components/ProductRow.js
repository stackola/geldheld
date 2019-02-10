import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import StandardBox from "./StandardBox";
import style from "../../style";
import Coins from "./Coins";
import StarRating from "react-native-star-rating";
import colors from "../../colors";

import { withNavigation } from "react-navigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navToProduct } from "../../lib";
export class ProductRow extends Component {
  pressed() {
    this.props.navigation.navigate(navToProduct("id"));
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.pressed();
        }}
      >
        <StandardBox noPadding style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: "https://i.imgur.com/xBjQ6Ld.png" }}
            resizeMode={"contain"}
            style={{ width: 100, minHeight: 80, backgroundColor: "white" }}
          />
          <View
            style={{
              flex: 1,
              padding: style.containerPadding,
              paddingTop: 0,
              paddingBottom: style.containerPadding
            }}
          >
            <Text style={style.containerHeadline}>Laser Pointer</Text>
            <Text style={style.text}>
              This cool laser pointer is both cool, and a laser pointer!
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: style.space / 2
              }}
            >
              <StarRating
                emptyStarColor={colors.textMinor}
                fullStarColor={colors.star}
                disabled={true}
                starSize={18}
                rating={3.5}
              />
              <Text
                style={{
                  color: colors.textMinor,
                  fontSize: 14,
                  paddingLeft: style.space / 4,
                  flex: 1
                }}
              >
                <Icon name="account" size={14} />
                25
              </Text>
              <View
                style={{
                  minWidth: 60,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexDirection: "row"
                }}
              >
                <Coins amount={1000} />
              </View>
            </View>
          </View>
        </StandardBox>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ProductRow);
