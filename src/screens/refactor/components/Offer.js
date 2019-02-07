import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import StandardBox from "../components/StandardBox";

import style from "../../../style";
import Coins from "./Coins";

export default class Offer extends Component {
  render() {
    return (
      <StandardBox noPadding style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: "https://i.imgur.com/FUqv7e3.png" }}
          resizeMode={"cover"}
          style={{ width: 80, minHeight: 80 }}
        />
        <View
          style={{
            flex: 1,
            padding: style.containerPadding,
            paddingTop: 0,
            paddingBottom: style.containerPadding
          }}
        >
          <Text style={style.containerHeadline}>Candy Crush</Text>
          <Text style={style.text}>
            Play this legendary game! Start playing Candy Crush Saga today –
            loved by millions of players around the world.
          </Text>
        </View>
        <View
          style={{
            minWidth: 60,
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: style.space,
            flexDirection: "row"
          }}
        >
          <Coins amount={1000} />
        </View>
      </StandardBox>
    );
  }
}
