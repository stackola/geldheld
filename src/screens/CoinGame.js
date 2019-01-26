import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Confetti from "react-native-confetti";

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
                if (this._confettiView) {
                  this._confettiView.startConfetti();
                }
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
    /*this.setState({ side: "tails", status: "running" }, () => {
      setTimeout(() => {
        this.setState({ status: "finished" });
        if (this._confettiView) {
          this._confettiView.startConfetti();
        }
      }, 5000);
    });*/
  }

  render() {
    return (
      <Wrapper>
        <Header
          title="Coin flip"
          hideBalance={
            this.state.status == "loading" || this.state.status == "running"
          }
        />

        <View style={{ flex: 1, flexDirection: "row" }}>
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
        <View style={{ height: 60 + 96 }}>
          {this.state.status == "start" && (
            <View>
              <Text style={{ color: colors.action, textAlign: "center" }}>
                Bet size
              </Text>
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
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.win > 0 ? (
                <React.Fragment>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                  >
                    You won {this.state.win} coins!
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
                    <Text>Play again</Text>
                  </TouchableOpacity>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                  >
                    You did not win this time.
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
                    <Text>Play again</Text>
                  </TouchableOpacity>
                </React.Fragment>
              )}
            </View>
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
