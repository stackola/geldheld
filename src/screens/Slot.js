import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SlotMachine from "react-native-slot-machine";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import SizePicker from "../components/SizePicker";
import SlotPayouts from "../components/SlotPayouts";
import colors from "../colors";

import { slot } from "../lib";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bet: 10,
      symbol: "5",
      status: "start"
    };
  }
  winToSymbol(w) {
    if (w == 0) {
      return 0;
    }
    if (w == 1) {
      return 1;
    }
    if (w == 2) {
      return 2;
    }
    if (w == 5) {
      return 3;
    }
    if (w == 10) {
      return 4;
    }
    if (w == 50) {
      return 5;
    }
  }
  componentDidMount = () => {};
  spin() {
    this.setState({ status: "loading" }, () => {
      slot(this.state.bet)
        .then(r => {
          console.log(r);
          if (r.data.error) {
            this.setState({ status: "error" });
            return;
          }
          console.log("godda!");
          this.slot.spinTo(this.winToSymbol(r.data.win));
          setTimeout(() => {
            this.setState({
              status: "finished",
              winAmount: r.data.amount,
              symbol: this.winToSymbol(r.data.win)
            });
          }, 5000);
        })
        .catch(e => {
          console.error(e);
          this.setState({ status: "error" });
        });
    });
  }
  render() {
    const symbols = ["☹️", "🤔", "🙂", "😀", "😲", "🤑"];
    return (
      <Wrapper>
        <Header
          showBack={true}
          title="Slot"
          hideBalance={this.state.status == "loading"}
        />
        <View style={{ alignItems: "center", flex: 1 }}>
          <SlotPayouts
            highlight={this.state.status == "finished" ? this.state.symbol : -1}
          />

          <View style={{ flex: 1, justifyContent: "center" }}>
            <SlotMachine
              ref={ref => {
                this.slot = ref;
              }}
              height={240}
              width={160}
              renderContent={c => (
                <Text style={{ fontSize: 80, color: "white" }}>
                  {symbols[c]}
                </Text>
              )}
              useNativeDriver={true}
              text={this.state.symbol}
              duration={5000}
              padding={1}
              styles={{
                overlay: { backgroundColor: "none" },
                slotWrapper: { backgroundColor: "none" },
                slotInner: { backgroundColor: "none" },
                innerBorder: { borderWidth: 0 },
                outerBorder: { backgroundColor: "none", borderWidth: 0 },
                text: { color: "white" }
              }}
              initialAnimation={false}
              range="544321000032103210210100"
            />
          </View>
        </View>
        <View style={{ height: 155, justifyContent: "center" }}>
          {this.state.status == "start" && (
            <React.Fragment>
              <SizePicker
                bet={this.state.bet}
                onChange={b => {
                  this.setState({ bet: b });
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.spin();
                }}
                style={{
                  margin: 8,
                  backgroundColor: colors.action,
                  borderRadius: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 60
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
                >
                  Go!
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
          {this.state.status == "finished" && (
            <View style={{ marginLeft: 8, marginRight: 8 }}>
              {this.state.winAmount > 0 ? (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 8,
                    fontSize: 18
                  }}
                >
                  You won {this.state.winAmount} coins!
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
                    this.setState({ status: "start" });
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
                    this.spin();
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
                    Bet {this.state.bet} again
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {this.state.status == "error" && (
            <View style={{ marginLeft: 8, marginRight: 8 }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 8,
                  fontSize: 18
                }}
              >
                Are you sure you have enough coins for that?
              </Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ status: "start" });
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
              </View>
            </View>
          )}
        </View>
      </Wrapper>
    );
  }
}
