import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import GameButton from "../components/GameButton";
import style from "../../style";

export class Games extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Games" />
        <ScrollView style={{ marginTop: style.space, marginLeft: style.space }}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <GameButton
              hue={22}
              image="https://i.imgur.com/wss02as.png"
              title={"Emoji spin"}
            />
            <GameButton hue={80} image="heads_icon" title={"Coin flip"} />
          </View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <GameButton hue={160} title="Lucky ticket" />
            <GameButton hue={200} title="Lucky wheel" />
          </View>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Games;
