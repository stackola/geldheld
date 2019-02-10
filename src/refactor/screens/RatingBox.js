import React, { Component } from "react";
import { Text, View } from "react-native";

import StarRating from "react-native-star-rating";
import colors from "../../colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../../style";
import ColorButton from "../components/ColorButton";

export default class RatingBox extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }} />

        <Text
          style={{
            color: colors.textMinor,
            fontSize: 15,
            paddingRight: style.space / 2
          }}
        >
          <Icon name="account" size={15} />
          {this.props.count}
        </Text>
        <StarRating
          emptyStarColor={colors.textMinor}
          fullStarColor={colors.star}
          disabled={true}
          starSize={25}
          rating={this.props.rating}
        />
      </View>
    );
  }
}
