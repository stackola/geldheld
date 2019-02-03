import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import ShopItemSquare from "../atoms/ShopItemSquare";
import ShopCategory from "../components/ShopCategory";
import ShopList from "../components/ShopList";
import Button from "../atoms/Button";

import { connect } from "react-redux";
import { ActionCreators } from "../redux/actions";
import { bindActionCreators } from "redux";
import * as RNIap from "react-native-iap";
import { validate } from "../lib";

const itemSkus = Platform.select({
  ios: ["as3ddd"],
  android: ["gadget_crate_1"]
});
class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    RNIap.getAvailablePurchases().then(p => {
      console.log(p);
      this.setState({ products: p });
    });
  }
  vali(p) {
    validate(p).then(res => {
      console.log("response from fb", res);
      if (res.data.status == "ok") {
        RNIap.consumePurchase(p.purchaseToken); 
      }
    });
  }

  render() {
    return (
      <Wrapper>
        <Header title="Purchases" />
        <ScrollView>
          {this.state.products.map(p => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.vali(p);
                }}
                style={{ height: 80, backgroundColor: "white" }}
              >
                <Text>Click here to redeem.</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return { config: state.config };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
