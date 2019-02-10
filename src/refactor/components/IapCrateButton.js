import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as RNIap from "react-native-iap";

import { withNavigation } from "react-navigation";
import { validate } from "../../lib";
import ColorButton from "./ColorButton";
import colors from "../../colors";

export class IapCrateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "start"
    };
  }

  pressed(sku) {
    if (this.state.status == "done" || this.state.status == "error") {
      this.setState({ status: "start" });
      return;
    }
    this.buyIap(sku);
  }

  buyIap(sku) {
    if (this.state.status != "start") {
      return;
    }
    this.setState({ status: "loading" }, () => {
      RNIap.buyProduct(sku)
        .then(r => {
          console.log(r, JSON.stringify(r));
          validate(r).then(res => {
            console.log("response from fb", res);
            if (res.data.status == "ok") {
              RNIap.consumePurchase(r.purchaseToken).then(() => {
                this.setState({ status: "done" }, () => {
                  this.props.navigation.navigate("MyCrates");
                });
              });
            } else {
              this.setState({ status: "error" });
            }
          });
        })
        .catch(e => {
          console.log("THIS ERROR", e);
          this.setState({ status: "error" }, () => {});
        });
    });
  }
  render() {
    let props = this.props;
    return (
      <ColorButton
        loading={this.state.status == "loading"}
        error={this.state.status == "error"}
        done={this.state.status == "done"}
        onPress={() => {
          this.pressed(props.sku);
        }}
        center
        small
        hue={110}
      >
        {props.count} <Icon name="cube-outline" color={colors.text} size={20} />{" "}
        for {props.storeInfo.localizedPrice}{" "}
        <Icon name="google-play" color={colors.text} size={20} />
      </ColorButton>
    );
  }
}

export default withNavigation(IapCrateButton);
