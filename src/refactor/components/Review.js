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

export default class Review extends Component {
  render() {
    return (
      <StandardBox>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <StarRating
            emptyStarColor={colors.textMinor}
            fullStarColor={colors.star}
            disabled={true}
            starSize={18}
            rating={4}
          />
          <Spacer size={style.space / 2} horizontal />
          <Title>4/5</Title>
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
        <SText>Arrived after: 2 weeks</SText>
        <SText>TBH this is pretty shit.</SText>
        <Spacer size={4} />
      </StandardBox>
    );
  }
}
