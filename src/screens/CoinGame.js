import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

import { flip } from "../lib";
import SizePicker from "../components/SizePicker";
import colors from "../colors";
import CoinSelect from "../components/CoinSelect";

export default class CoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      side: "heads",
      status: "start",
      bet: 15,
      selected: null
    };
  }
  getOtherSide(side) {
    if (side == "heads") {
      return "tails";
    }
    return "heads";
  }
  componentDidMount() {}
  reset() {
    this.setState({ side: "heads", status: "start", win: 0, selected: null });
  }
  spin(side) {
    console.log("bet on ", side);
    this.setState({ selected: side, status: "loading" }, () => {
      flip(this.state.bet)
        .then(r => {
          console.log(r);
          if (r.data.error) {
            //bet failed
            this.setState({ status: "error", side: "heads" });
            return;
          }
          if (r.data.win) {
            this.setState({ side: side, status: "running" }, () => {
              setTimeout(() => {
                this.setState({ status: "finished", win: r.data.amount });
              }, 5000);
            });
          } else {
            this.setState(
              { side: this.getOtherSide(side), status: "running" },
              () => {
                setTimeout(() => {
                  this.setState({ status: "finished", win: 0 });
                }, 5000);
              }
            );
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  }

  render() {
    return (
      <Wrapper>
        <Header
          showBack={true}
          title="Coin flip"
          hideBalance={
            this.state.status == "loading" || this.state.status == "running"
          }
        />

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={{ uri: "heads_static" }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0
            }}
            resizeMode="contain"
          />
          {(this.state.status == "start" ||
            this.state.status == "loading" ||
            this.state.status == "error") && (
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
        <View style={{ height: 60 + 96, justifyContent: "center" }}>
          {this.state.status == "start" && (
            <View>
              <SizePicker
                bet={this.state.bet}
                onChange={v => {
                  this.setState({ bet: v });
                }}
              />
              <CoinSelect
                onSpin={side => {
                  this.spin(side);
                }}
              />
            </View>
          )}
          {this.state.status == "error" && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Are you sure you have enough coins for that?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.reset();
                }}
                style={{
                  backgroundColor: "white",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                  borderRadius: 4,
                  marginTop: 12
                }}
              >
                <Text>Try again</Text>
              </TouchableOpacity>
            </View>
          )}

          {this.state.status == "finished" && (
            <View style={{ marginLeft: 8, marginRight: 8 }}>
              {this.state.win > 0 ? (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 8,
                    fontSize: 18
                  }}
                >
                  You won {this.state.win} coins!
                </Text>
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 8,
                    fontSize: 18
                  }}
                >
                  You did not win this time.
                </Text>
              )}
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.reset();
                  }}
                  style={{
                    flex: 1,
                    height: 40,
                    borderRadius: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white"
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Go Back</Text>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity
                  onPress={() => {
                    this.spin(this.state.selected);
                  }}
                  style={{
                    flex: 1,
                    height: 40,
                    borderRadius: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.action
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Bet {this.state.bet} on {this.state.selected} again!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Wrapper>
    );
  }
}
