import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";

import * as RNIap from "react-native-iap";

import { withNavigation } from "react-navigation";
import { validate } from "../lib";

export class IapCrateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "start"
    };
  }

  buyIap(sku) {
    if (this.state.status!="start"){
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
                this.props.navigation.navigate("MyCrates");
                //this.setState({ status: "done" });
              });
            }
          });
        })
        .catch(e => {
          console.log("THIS ERROR",e);
          this.setState({ status: "error" }, () => {});
        });
    });
  }
  render() {
    let p = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.buyIap(p.sku);
        }}
        style={{
          flex: 1,
          margin: 4,
          height: 50,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4
        }}
      >
        {this.state.status == "start" && <Text>{p.count}</Text>}
        {this.state.status == "error" && <Text>Something went wrong.</Text>}
        {this.state.status == "done" && <Text>Done</Text>}
        {this.state.status == "loading" && <ActivityIndicator />}
      </TouchableOpacity>
    );
  }
}

export default withNavigation(IapCrateButton);
