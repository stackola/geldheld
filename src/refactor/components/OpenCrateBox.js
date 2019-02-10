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
import { openCrate as sendOpenCrate } from "../../lib";

export class OpenCrateBox extends Component {
  constructor(props) {
    super(props);
    this.state = { wellOpen: false, status: "start", items: [] };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.calc();
  }
  calc() {
    this.itemCount = this.state.items.length;
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
  componentDidMount() {
    this.setState({ items: this.props.items }, () => {
      this.calc();
    });
  }
  spin() {
    //this.offset.setValue(this.getStartPos());

    Animated.timing(this.offset, {
      toValue: this.getEndPos(),
      duration: 12000,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true
    }).start(() => {
      //done spinning
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ status: "done" });
    });
  }

  openCrate() {
    let userCrateId = this.props.userCrateId;
    //set state to loading.
    //open crate on server
    //open well
    //start spinning
    //set status to done.
    this.setState({ status: "loading" }, () => {
      //open box..
      sendOpenCrate(userCrateId)
        .then(resp => {
          //build the array!
          this.setState(
            {
              items: [
                resp.data.data.item,
                ...this.state.items,
                ...this.state.items,
                ...this.state.items,
                ...this.state.items,
                ...this.state.items
              ]
            },
            () => {
              this.calc();
              let p = LayoutAnimation.Presets.easeInEaseOut;
              p = { ...p, duration: 1000 };
              this.offset.setValue(this.getStartPos());
              LayoutAnimation.configureNext(p);
              this.setState({ wellOpen: true }, () => {
                setTimeout(() => {
                  this.spin();
                }, 1000);
              });
            }
          );
        })
        .catch(err => {
          this.setState({ status: "error" });
        });
    });
  }

  open() {
    let userCrateId = this.props.navigation.getParam("id", null);
    openCrate(userCrateId).then(resp => {
      let p = {
        droppedItem: resp.data.data,
        status: "finished",
        openCrateLoading: false,
        slotItem: resp.data.data.item.order
      };

      this.slot.spinTo(resp.data.data.item.order);
    });
  }

  render() {
    let dp = {
      margin: style.space / 2,
      width: this.itemWidth,
      color: colors.darkTransparent
    };

    return (
      <View
        style={{
          marginBottom: this.state.wellOpen ? style.space * 30 : 0
        }}
      >
        {this.state.wellOpen ? (
          <Well
            static
            style={{ marginBottom: style.space }}
            hue={240}
            sat={34}
            l={7}
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
                {this.state.items.map(item => {
                  return (
                    <React.Fragment>
                      <Spacer horizontal size={this.spacerWidth} />
                      <CrateItem {...dp} {...item} />
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
                  borderLeftWidth: 5,
                  borderRightWidth: 5,
                  transform: [{ rotate: "180deg" }],
                  borderBottomWidth: 10,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: colors.text
                }}
              />
            </View>
          </Well>
        ) : (
          <ColorButton
            center
            loading={this.state.status == "loading"}
            error={this.state.status == "error"}
            small
            hue={120}
            onPress={() => {
              this.openCrate();
            }}
          >
            Open
          </ColorButton>
        )}
        {this.state.status == "done" && (
          <React.Fragment>
            <ColorButton small center hue={40}>
              Quick sell for 80{" "}
              <Icon name="coin" size={20} color={colors.text} />
            </ColorButton>
            <BuyCrateBox {...this.props} text={"Buy same crate again"} />
          </React.Fragment>
        )}
      </View>
    );
  }
}

export default OpenCrateBox;
