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
          <Game path={"CoinGame"} title="Coin flip!" />
          <Game path={"Slot"} title="Slot!" />
          <Game />
          <Game />
        </ScrollView>
      </Wrapper>
    );
  }
}
