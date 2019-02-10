import React, { Component } from "react";
import { Text, View } from "react-native";
import StandardBox from "./StandardBox";

import StarRating from "react-native-star-rating";
import colors from "../../colors";
import SText from "./SText";
import Title from "./Title";
import Spacer from "./Spacer";
import style from "../../style";
import { format } from "date-fns";
import { review } from "../../lib";

export default class Review extends Component {
  render() {
    let p = this.props;
    return (
      <StandardBox>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <StarRating
            emptyStarColor={colors.textMinor}
            fullStarColor={colors.star}
            disabled={true}
            starSize={18}
            rating={p.rating}
          />
          <Spacer size={style.space / 2} horizontal />
          <Title>{p.rating}/5</Title>
          <View style={{ flex: 1 }} />
          <Text
            style={{
              color: colors.textMinor,
              textAlign: "center",
              fontSize: 11
            }}
          >
            {format(new Date(), "YYYY/MM/DD")}
          </Text>
        </View>
        {!!p.shippingTime && <SText>Arrived after: {p.shippingTime}</SText>}
        {!!p.text && <SText>{p.text}</SText>}
        {p.shippingTime || p.text ? <Spacer size={4} /> : null}
      </StandardBox>
    );
  }
}
