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

import * as RNIap from "react-native-iap";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import StandardBox from "./StandardBox";
import IapCrateButton from "./IapCrateButton";
import BuyCrateButton from "./BuyCrateButton";
export class BuyCrateBox extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, skuMap: {} };
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
  componentDidMount() {
    this.loadSKUs();
  }
  loadSKUs() {
    let skuArray = this.props.iaps.map(i => i.sku);
    RNIap.getProducts(skuArray).then(products => {
      console.log(products);
      let skuMap = {};
      products.map(p => {
        skuMap[p.productId] = p;
      });
      this.setState({ skuMap: skuMap });
    });
  }

  render() {
    let props = this.props;
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
        <Icon name="cart" color={colors.text} size={20} />{" "}
        {this.props.text || "Buy"}
      </ColorButton>
    ) : (
      <View>
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
        <BuyCrateButton {...this.props} />
        <View style={{ flexDirection: "column" }}>
          {this.props.iaps.map(iap => {
            return (
              <IapCrateButton
                {...iap}
                storeInfo={
                  this.state.skuMap[iap.sku] ? this.state.skuMap[iap.sku] : {}
                }
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default BuyCrateBox;
