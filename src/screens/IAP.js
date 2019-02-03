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

const itemSkus = Platform.select({
  ios: ["as3ddd"],
  android: ["android.test.purchased", "case_1", "crate_2", "crate_3"]
});
class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      resp: ""
    };
  }

  componentDidMount() {
    RNIap.consumeAllItems().then(() => {
      RNIap.endConnection().then(() => {
        RNIap.getProducts(itemSkus).then(p => {
          console.log("prods", p);
          this.setState({ products: p }, () => {
            RNIap.endConnection().catch((err)=>{console.log("IAP ERR",err);});
          });
        }).catch((err)=>{console.log("IAP ERR",err);});;
      }).catch((err)=>{console.log("IAP ERR",err);});;
    }).catch((err)=>{console.log("IAP ERR",err);});;
  }
  buy(id) {
    RNIap.buyProduct(id)
      .then(r => {
        console.log(r);
        this.setState({ resp: r }, () => {
          RNIap.endConnection().catch((err)=>{console.log("IAP ERR",err);});;
        });
      })
      .catch(e => {
        this.setState({ resp: e }, () => {
          RNIap.endConnection().catch((err)=>{console.log("IAP ERR",err);});;
        });
      });
  }
  render() {
    return (
      <Wrapper>
        <Header title="Shop" />
        <ScrollView>
          <View style={{ backgroundColor: "white", padding: 4, margin: 4 }}>
            <Text>{JSON.stringify(this.state.resp)}</Text>
          </View>
          {this.state.products.map(p => {
            return (
              <TouchableOpacity
                style={{
                  padding: 4,
                  marginBottom: 8,
                  backgroundColor: "white"
                }}
                onPress={() => {
                  this.buy(p.productId);
                }}
              >
                <Text>{JSON.stringify(p)}</Text>
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
