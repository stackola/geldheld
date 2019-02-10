import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import StandardBox from "./StandardBox";
import style from "../../style";
import Coins from "./Coins";
import StarRating from "react-native-star-rating";
import colors from "../../colors";

import { withNavigation } from "react-navigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Title from "./Title";
import { navToProduct } from "../../lib";
export class ProductSquare extends Component {
  pressed() {
    this.props.navigation.navigate(navToProduct(this.props.id));
  }
  render() {
    return (
      <StandardBox
        noPadding
        style={{
          marginBottom: 0,
          width: 240,
          marginRight: style.space,
          marginLeft: 0,
          height: 160
        }}
      >
        {this.props.loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={colors.text} />
          </View>
        ) : (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.pressed();
            }}
          >
            <Image
              source={{ uri: "https://i.imgur.com/xBjQ6Ld.png" }}
              resizeMode={"contain"}
              style={{ height: 80, backgroundColor: "white" }}
            />
            <View
              style={{
                flex: 1,
                height: 80,
                justifyContent: "center",
                padding: style.containerPadding,
                paddingTop: 0,
                paddingBottom: style.containerPadding
              }}
            >
              <Title style={style.containerHeadline}>Laser Pointer</Title>
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
          </TouchableOpacity>
        )}
      </StandardBox>
    );
  }
}

export default withNavigation(ProductSquare);
