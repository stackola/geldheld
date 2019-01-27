import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Game from "../components/Game";

export default class Play extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Play" />

        <ScrollView>
          <Game path={"CoinGame"} title="Coin flip" image={"heads_icon"} />
          <Game
            path={"Slot"}
            title="Emoji spin"
            image="https://i.imgur.com/lfdgT9u.png"
          />
          <Game path={"Play"} title="Fortune wheel" />
        </ScrollView>
      </Wrapper>
    );
  }
}
