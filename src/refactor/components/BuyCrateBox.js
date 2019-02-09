import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity
} from "react-native";
import ColorButton from "./ColorButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import StandardBox from "./StandardBox";
export class BuyCrateBox extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  toggleOpen() {
    let p = LayoutAnimation.Presets.easeInEaseOut;
    p = { ...p, duration: 200 };
    LayoutAnimation.configureNext(p);
    this.setState({ open: !this.state.open });
  }
  render() {
    return !this.state.open ? (
      <ColorButton
        center
        inLine
        small
        hue={110}
        onPress={() => {
          this.toggleOpen();
        }}
      >
        <Icon name="cart" color={colors.text} size={20} /> Buy
      </ColorButton>
    ) : (
      <View>
        <ColorButton center small hue={40}>
          1 <Icon name="cube-outline" color={colors.text} size={20} /> for 100{" "}
          <Icon name="coin" color={colors.text} size={20} />
        </ColorButton>
        <View style={{ flexDirection: "column" }}>
          <ColorButton center small hue={110}>
            1 <Icon name="cube-outline" color={colors.text} size={20} /> for
            $1.09 <Icon name="google-play" color={colors.text} size={20} />
          </ColorButton>
          <ColorButton center small hue={110}>
            5 <Icon name="cube-outline" color={colors.text} size={20} /> for
            $4.59 <Icon name="google-play" color={colors.text} size={20} />
          </ColorButton>
          <ColorButton center small hue={110}>
            10 <Icon name="cube-outline" color={colors.text} size={20} /> for
            $9.00 <Icon name="google-play" color={colors.text} size={20} />
          </ColorButton>
          <ColorButton
            onPress={() => {
              this.toggleOpen();
            }}
            center
            small
            hue={110}
            sat={0}
            smallFont
          >
            Close
          </ColorButton>
        </View>
      </View>
    );
  }
}

export default BuyCrateBox;
