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
              hue={130}
              image="https://i.imgur.com/wss02as.png"
              title={"Emoji spin"}
            />
            <GameButton
              hue={10}
              image="heads_icon"
              title={"Coin flip"}
              routeName="CoinGame"
              navigation={this.props.navigation}
            />
          </View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <GameButton
              hue={60}
              title="Golden ticket"
              image="https://i.imgur.com/5P2ZQbg.png"
            />
            <GameButton
              hue={185}
              title="Lucky wheel"
              image="https://i.imgur.com/2beknjX.png"
            />
          </View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <GameButton
              hue={220}
              title="Pick-a-duck"
              routeName="DuckGame"
              navigation={this.props.navigation}
              image="https://i.imgur.com/J0GHuae.png"
            />
          </View>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Games;
