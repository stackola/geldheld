import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  Easing,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import Well from "./Well";
import Spacer from "./Spacer";
import CrateItem from "./CrateItem";
import style from "../../style";
import colors from "../../colors";
import ColorButton from "./ColorButton";
import BuyCrateBox from "./BuyCrateBox";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export class OpenCrateBox extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, opened: false };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.items = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    ];
    this.itemCount = this.items.length;
    this.itemWidth = 120;
    this.spacerWidth = 200;
    this.totalWidth = this.itemWidth + this.spacerWidth;
    this.containerWidth = 400;
    this.offset = new Animated.Value(0);
  }
  getStartPos() {
    return (
      this.itemCount * this.totalWidth * -1 +
      this.containerWidth / 2 +
      this.totalWidth / 2 -
      this.spacerWidth / 2
    );
  }
  getEndPos() {
    return (
      -this.totalWidth / 2 + this.containerWidth / 2 - this.spacerWidth / 2
    );
  }
  componentDidMount() {}
  spin() {
    //this.offset.setValue(this.getStartPos());
    Animated.timing(this.offset, {
      toValue: this.getEndPos(),
      duration: 12000,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true
    }).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ opened: true });
    });
  }
  toggleOpen() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ open: !this.state.open });
  }
  openCrate() {
    let p = LayoutAnimation.Presets.easeInEaseOut;
    p = { ...p, duration: 1000 };
    this.offset.setValue(this.getStartPos());
    LayoutAnimation.configureNext(p);
    this.setState({ open: true }, () => {
      setTimeout(() => {
        this.spin();
      }, 1000);
    });
  }
  render() {
    let dp = {
      margin: style.space / 2,
      width: this.itemWidth,
      color: colors.darkTransparent
    };

    return (
      <React.Fragment>
        {this.state.open ? (
          <Well
            static
            style={{ marginBottom: style.space }}
            hue={this.props.hue}
          >
            <View
              style={{ height: 88, flex: 1 }}
              onLayout={event => {
                var { width } = event.nativeEvent.layout;
                this.containerWidth = width;
              }}
            >
              <Animated.View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  translateX: this.offset
                }}
              >
                {this.items.map(() => {
                  return (
                    <React.Fragment>
                      <Spacer horizontal size={this.spacerWidth} />
                      <CrateItem
                        {...dp}
                        type={"crate"}
                        rarity={1}
                        chance={10}
                        hue={199}
                        name="Tiny crate"
                      />
                    </React.Fragment>
                  );
                })}
              </Animated.View>
            </View>
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  transform: [{ rotate: "180deg" }],
                  borderBottomWidth: 20,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: "black"
                }}
              />
            </View>
          </Well>
        ) : (
          <ColorButton
            center
            small
            hue={120}
            onPress={() => {
              this.openCrate();
            }}
          >
            Open
          </ColorButton>
        )}
        {this.state.opened && (
          <React.Fragment>
            <ColorButton small center hue={40}>
              Quick sell for 80{" "}
              <Icon name="coin" size={20} color={colors.text} />
            </ColorButton>
            <BuyCrateBox text={"Buy same crate again"} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default OpenCrateBox;
