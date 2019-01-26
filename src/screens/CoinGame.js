import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Confetti from "react-native-confetti";

export default class CoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      side: "heads",
      status: "start"
    };
  }

  componentDidMount() {}
  reset() {
    this.setState({ side: "heads", status: "start" });
  }
  spin() {
    this.setState({ side: "tails", status: "running" }, () => {
      setTimeout(() => {
        this.setState({ status: "finished" });
        if (this._confettiView) {
          this._confettiView.startConfetti();
        }
      }, 5000);
    });
  }

  render() {
    return (
      <Wrapper>
        <Header title="Coin flip" />

        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.state.status == "start" && (
            <Image
              source={{ uri: "heads_static" }}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          )}
          {(this.state.status == "running" ||
            this.state.status == "finished") && (
            <Image
              source={{ uri: this.state.side }}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={{ height: 100 }}>
          {this.state.status == "start" && (
            <TouchableOpacity
              style={{ height: 100, backgroundColor: "red" }}
              onPress={() => {
                this.spin();
              }}
            >
              <Text>Spin!</Text>
            </TouchableOpacity>
          )}
          {this.state.status == "finished" && (
            <TouchableOpacity
              style={{ height: 100, backgroundColor: "red" }}
              onPress={() => {
                this.reset();
              }}
            >
              <Text>Play again!</Text>
            </TouchableOpacity>
          )}
        </View>
        <Confetti
          ref={node => (this._confettiView = node)}
          timeout={5}
          duration={3000}
          confettiCount={20}
        />
      </Wrapper>
    );
  }
}
