import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import BetSizeSelector from "../components/BetSizeSelector";
import style from "../../style";
import { flip } from "../../lib";
import CoinSelect from "../components/CoinSelect";
import StandardBox from "../components/StandardBox";
import Title from "../components/Title";
import Coins from "../components/Coins";
import ColorButton from "../components/ColorButton";
import Spacer from "../components/Spacer";

export class CoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      side: "heads",
      status: "start",
      bet: 15,
      selected: null,
      win: 0
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  getOtherSide(side) {
    if (side == "heads") {
      return "tails";
    }
    return "heads";
  }
  componentDidMount() {}
  reset() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300
    });
    this.setState({ side: "heads", status: "start", win: 0, selected: null });
  }
  spin(side) {
    console.log("bet on ", side);
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300
    });
    this.setState({ selected: side, status: "loading" }, () => {
      flip(this.state.bet)
        .then(r => {
          console.log(r);
          LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: 300
          });
          if (r.data.error) {
            //bet failed

            this.setState({ status: "error", side: "heads" });
            return;
          }
          if (r.data.win) {
            this.setState({ side: side, status: "running" }, () => {
              setTimeout(() => {
                LayoutAnimation.configureNext({
                  ...LayoutAnimation.Presets.easeInEaseOut,
                  duration: 300
                });
                this.setState({ status: "finished", win: r.data.amount });
              }, 5000);
            });
          } else {
            this.setState(
              { side: this.getOtherSide(side), status: "running" },
              () => {
                setTimeout(() => {
                  LayoutAnimation.configureNext({
                    ...LayoutAnimation.Presets.easeInEaseOut,
                    duration: 300
                  });
                  this.setState({ status: "finished", win: 0 });
                }, 5000);
              }
            );
          }
        })
        .catch(e => {
          console.error(e);
          LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: 300
          });
          this.setState({ status: "error", side: "heads" });
        });
    });
  }
  render() {
    return (
      <Wrapper>
        <Header title="Coin flip" showBack />
        <ScrollView style={{}}>
          <View
            style={{
              borderRadius: style.bigBorderRadius,
              overflow: "hidden",
              height: 400,
              marginRight: style.space,
              marginLeft: style.space
            }}
          >
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
          {this.state.status == "start" && (
            <View>
              <BetSizeSelector
                betSize={this.state.bet}
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
          {(this.state.status == "loading" ||
            this.state.status == "running") && <StandardBox loading />}
          {this.state.status == "error" && (
            <StandardBox red>
              <Title>
                Something went wrong. Are you sure you have enough coins?
              </Title>
              <ColorButton
                center
                noMargin
                hue={240}
                style={{ marginBottom: style.space / 2 }}
                small
                smallFont
                onPress={() => {
                  this.reset();
                }}
              >
                Go back
              </ColorButton>
            </StandardBox>
          )}
          {this.state.status == "finished" && (
            <React.Fragment>
              <StandardBox>
                <Spacer />
                {this.state.win > 0 ? (
                  <Title style={{ textAlign: "center" }}>
                    You won <Coins size={16} amount={this.state.win} />
                  </Title>
                ) : (
                  <Title style={{ textAlign: "center" }}>
                    You did not win this time.
                  </Title>
                )}
                <Spacer />
                <ColorButton
                  center
                  noMargin
                  hue={120}
                  small
                  smallFont
                  onPress={() => {
                    this.spin(this.state.selected);
                  }}
                >
                  Bet <Coins amount={this.state.bet} size={14} /> on{" "}
                  {this.state.selected} again!
                </ColorButton>
                <ColorButton
                  center
                  noMargin
                  hue={240}
                  style={{ marginBottom: style.space / 2 }}
                  small
                  smallFont
                  onPress={() => {
                    this.reset();
                  }}
                >
                  Go back
                </ColorButton>
              </StandardBox>
            </React.Fragment>
          )}
        </ScrollView>
      </Wrapper>
    );
  }
}

export default CoinGame;
