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
      symbol: "0",
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
              status: "start",
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
        <Header title="Slot" hideBalance={this.state.status == "loading"} />
        <View style={{ alignItems: "center", flex: 1 }}>
          <SlotPayouts highlight={this.state.symbol} />

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
              range="012345012345012345012345012345"
            />
          </View>
        </View>
        <View style={{ height: 155 }}>
          <SizePicker
            bet={this.state.bet}
            onChange={b => {
              this.setState({ bet: b });
            }}
          />
          {this.state.status == "start" && (
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
                Spin!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Wrapper>
    );
  }
}
