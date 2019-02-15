import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import style from "../../style";
import ColorButton from "../components/ColorButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import StandardBox from "../components/StandardBox";
import Coins from "../components/Coins";
import Title from "../components/Title";
import SText from "../components/SText";
import Spacer from "../components/Spacer";
import BetSizeSelector from "../components/BetSizeSelector";
import { playDuckGame } from "../../lib";

let ducks = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  3
];

export class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      status: "start",
      ducks: this.makeDuckObj(ducks),
      betSize: 10
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  // ablauf:
  // enten random sichtbar
  // bet size auswahl
  // select duck to play
  // mark duck, display loading
  // reveal ducks
  // show "shuffle" button.
  //
  assignValuesToUserDucks(nextDucks, cb) {
    let d = nextDucks;
    let newState = this.state.ducks.rows;
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let index = x * 8 + y;
        v = nextDucks[index];
        newState = this.setDuckValue(x, y, v, newState);
      }
    }
    this.setState({ ducks: { rows: newState } }, () => {
      cb && cb();
    });
  }

  getSelectedDucks() {
    return this.state.ducks.rows
      .map(row => {
        return row.filter(d => d.selected);
      })
      .reduce((a, b) => [...a, ...b]);
  }
  getTotalWin(arr = this.getSelectedDucks()) {
    if (!arr || arr.length == 0) {
      return 0;
    }
    return (
      arr
        .map(obj => {
          if (obj.value == 0) {
            return 0;
          }
          if (obj.value == 1) {
            return 2;
          }
          if (obj.value == 2) {
            return 5;
          }
          if (obj.value == 3) {
            return 10;
          }
        })
        .reduce((a, b) => a + b) * this.state.betSize
    );
  }
  play() {
    if (this.state.status == "done" || this.state.status == "error") {
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: 500
      });
      this.setState({ status: "start", hidden: true });
      return;
    }
    if (this.state.status == "start") {
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: 500
      });
      this.setState({ status: "loading" }, () => {
        let payload = {
          betSize: this.state.betSize,
          selectedDucks: this.getSelectedDucks()
        };
        console.log(JSON.stringify(payload));
        playDuckGame(payload)
          .then(res => {
            if (res.data.status == "ok") {
              this.assignValuesToUserDucks(res.data.shuffledDucks, () => {
                LayoutAnimation.configureNext({
                  ...LayoutAnimation.Presets.easeInEaseOut,
                  duration: 4000
                });
                this.setState({ hidden: false }, () => {
                  setTimeout(() => {
                    this.setState({ status: "done" });
                  }, 4000);
                });
              });
            } else {
              this.setState({ status: "error" });
            }
          })
          .catch(() => {
            this.setState({ status: "error" });
          });
      });
    }
    //set loading
    ///get new array
    // animate ducks
    //reveal win
  }
  makeDuckObj(items) {
    let row1 = items.slice(0, 8).map((i, index) => {
      return { value: i, selected: false, row: 0, col: index };
    });
    let row2 = items.slice(8, 16).map((i, index) => {
      return { value: i, selected: false, row: 1, col: index };
    });
    let row3 = items.slice(16, 24).map((i, index) => {
      return { value: i, selected: false, row: 2, col: index };
    });
    let row4 = items.slice(24, 32).map((i, index) => {
      return { value: i, selected: false, row: 3, col: index };
    });
    let row5 = items.slice(32, 40).map((i, index) => {
      return { value: i, selected: false, row: 4, col: index };
    });
    let row6 = items.slice(40, 48).map((i, index) => {
      return { value: i, selected: false, row: 5, col: index };
    });
    let row7 = items.slice(48, 56).map((i, index) => {
      return { value: i, selected: false, row: 6, col: index };
    });
    let row8 = items.slice(56, 64).map((i, index) => {
      return { value: i, selected: false, row: 7, col: index };
    });
    return { rows: [row1, row2, row3, row4, row5, row6, row7, row8] };
  }
  componentDidMount() {}
  getSelectedCount() {
    return this.state.ducks.rows
      .map(row => {
        let subCount = 0;
        return row.filter(d => d.selected).length;
      })
      .reduce((a, b) => a + b);
  }
  selectDuck(row, col) {
    if (this.state.status != "start") {
      return;
    }
    let tmpRows = this.state.ducks.rows;
    tmpRows = tmpRows.map((i, index) => {
      if (index == row) {
        return [
          ...i.slice(0, col),
          { ...i[col], selected: !i[col].selected },
          ...i.slice(col + 1)
        ];
      } else {
        return i;
      }
    });

    this.setState({ ducks: { rows: tmpRows } });
  }
  setDuckValue(row, col, v, currentState) {
    let tmpRows = currentState;
    console.log("got here");
    tmpRows = tmpRows.map((i, index) => {
      console.log("got here2");
      if (index == row) {
        return [
          ...i.slice(0, col),
          { ...i[col], value: v },
          ...i.slice(col + 1)
        ];
      } else {
        return i;
      }
    });

    return tmpRows;
  }
  render() {
    let duckCount = this.getSelectedCount();
    return (
      <Wrapper>
        <Header
          title="Pick-a-duck"
          showBack
          hideBalance={this.state.status == "loading"}
        />
        <ScrollView style={{ flex: 1 }}>
          <Spacer />
          <StandardBox>
            <Title style={{ marginTop: 2, textAlign: "center" }}>Prizes</Title>
            <View style={{ flexDirection: "row" }}>
              <PayOut color={"grey"} multi={0} betSize={this.state.betSize} />
              <PayOut color={"orange"} multi={2} betSize={this.state.betSize} />
              <PayOut color={"red"} multi={5} betSize={this.state.betSize} />
              <PayOut color={"green"} multi={10} betSize={this.state.betSize} />
            </View>
          </StandardBox>
          <View
            style={{
              height: 250,
              marginLeft: style.space - 2,
              marginRight: style.space - 2
            }}
          >
            {this.state.ducks.rows.map((i, index) => {
              return (
                <Row
                  key={index}
                  items={i}
                  row={index}
                  hidden={this.state.hidden}
                  pressed={(row, col) => {
                    console.log("Duck pressed", row, col);
                    this.selectDuck(row, col);
                  }}
                />
              );
            })}
          </View>
          <React.Fragment>
            <Spacer />

            <ColorButton
              small
              center
              loading={this.state.status == "loading"}
              error={this.state.status == "error"}
              hue={120}
              sat={duckCount ? 100 : 0}
              onPress={() => {
                duckCount && this.play();
              }}
            >
              {this.state.status == "done" ? (
                <React.Fragment>
                  You won <Coins amount={this.getTotalWin()} size={20} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {duckCount ? (
                    <React.Fragment>
                      Buy {duckCount} duck{duckCount > 1 ? "s" : ""} for{" "}
                      <Coins
                        amount={duckCount * this.state.betSize}
                        size={20}
                      />
                    </React.Fragment>
                  ) : (
                    "Select at least one duck"
                  )}
                </React.Fragment>
              )}
            </ColorButton>
            {this.state.status == "start" && (
              <BetSizeSelector
                betSize={this.state.betSize}
                onChange={b => {
                  this.setState({ betSize: b });
                }}
              />
            )}
          </React.Fragment>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Inventory;

function PayOut(p) {
  return (
    <Text
      style={{
        color: colors.text,
        textAlign: "center",
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Icon name={"duck"} color={p.color} size={30} />
      {"\n"}
      <Coins amount={p.betSize * p.multi} />
    </Text>
  );
}

function getDuckColor(v) {
  if (v == 0) {
    return "#AAAAAA";
  }
  if (v == 1) {
    return "#FFA500";
  }
  if (v == 2) {
    return "#FF0000";
  }
  if (v == 3) {
    return "#00FF00";
  }
}
let Duck = p => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        margin: 2,
        backgroundColor: p.data.selected ? colors.green + "77" : "rgba(0,0,0,0)"
      }}
      onPress={() => {
        p.pressed();
      }}
    >
      <View style={{ width: 20, height: 20 }}>
        <Icon
          name={"duck"}
          color={getDuckColor(p.data.value) + (p.data.selected ? "FF" : "33")}
          size={20}
          style={{ position: "absolute", width: p.hidden ? 0 : "100%" }}
        />
        <Icon
          name={"duck"}
          color={p.data.selected ? "yellow" : "#ffff0033"}
          size={20}
          style={{ position: "absolute", width: !p.hidden ? 0 : "100%" }}
        />
      </View>
    </TouchableOpacity>
  );
};

let Row = p => {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      {p.items.map((i, index) => {
        return (
          <Duck
            hidden={p.hidden}
            data={i}
            key={index}
            pressed={() => {
              p.pressed(p.row, index);
            }}
          />
        );
      })}
    </View>
  );
};

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
