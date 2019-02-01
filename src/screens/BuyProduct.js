import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Platform,
  UIManager,
  ActivityIndicator,
  LayoutAnimation,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { ActionCreators } from "../redux/actions";
import { bindActionCreators } from "redux";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import ShopItem from "../atoms/ShopItem";
import ItemLoader from "../components/ItemLoader";
import { getUID, getVouchersForProduct, order } from "../lib";
import ShippingOptionSelector from "../components/ShippingOptionSelector";
import colors from "../colors";
import ShippingAddressSelector from "../components/ShippingAddressSelector";

class BuyProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingOption: 0,
      voucher: null,
      address: "",
      orderLoading: false,
      useVoucher: false,
      status: "start",
      orderStatus: "start",
      saveAddress: false,
      hasVoucher: false
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  placeOrder(p) {
    if (this.state.orderStatus != "start" || this.state.orderLoading) {
      return;
    }
    console.log("placing order!");
    let payload = {
      useVoucher: this.state.useVoucher,
      address: this.state.address,
      saveAddress: this.state.saveAddress,
      shippingOption: this.state.shippingOption,
      productId: p.id,
      voucherId: this.state.voucher ? this.state.voucher.id : null
    };
    this.setState(
      {
        orderLoading: true
      },
      () => {
        order(payload).then(r => {
          console.log("got order responsem", r);
          if (r.data.status == "ok") {
            //order successfull
            this.setState({
              orderStatus: "done",
              orderLoading: false
            });
          } else {
            // something went wrong.
            this.setState({
              orderStatus: "error",
              orderLoading: false
            });
          }
        });
      }
    );
  }
  fetchVouchers() {
    let productId = this.props.navigation.getParam("productId", null);
    getVouchersForProduct(productId).then(vs => {
      console.log(vs);
      if (vs.length > 0) {
        let voucher = vs[0];
        this.setState({ voucher, hasVoucher: true });
      }
    });
  }
  componentDidMount() {
    this.fetchVouchers();
    if (this.props.user.address) {
      this.setState({ address: this.props.user.address, saveAddress: true });
    }
    //fetch product.
    //fetch vouchers.
  }
  getTotalPrice(p) {
    return p.price + p.shippingOptions[this.state.shippingOption].price;
  }

  getVoucherPrice(p) {
    return p.shippingOptions[this.state.shippingOption].price;
  }
  continueWithVoucher() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ useVoucher: true, status: "confirmation" });
  }
  continueWithCoins() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ useVoucher: false, status: "confirmation" });
  }
  render() {
    let productId = this.props.navigation.getParam("productId", null);
    let userId = getUID();
    return (
      <Wrapper>
        <Header
          title={this.state.status == "start" ? "Buy Product" : "Confirm order"}
          showBack={true}
          customBack={
            this.state.status == "start" || this.state.orderStatus == "done"
              ? null
              : () => {
                  this.setState({ status: "start" });
                }
          }
        />
        <ItemLoader path={"products/" + productId}>
          {product => {
            return (
              <React.Fragment>
                {this.state.status == "start" && (
                  <ScrollView style={{ flex: 1 }}>
                    <View style={{ height: 8 }} />
                    <ShopItem {...product} noLink={true} />
                    <ShippingOptionSelector
                      onChange={i => {
                        this.setState({ shippingOption: i });
                      }}
                      selected={this.state.shippingOption}
                      options={product.shippingOptions}
                    />
                    <ShippingAddressSelector
                      setAddress={a => {
                        this.setState({ address: a });
                      }}
                      setSave={v => {
                        this.setState({ saveAddress: v });
                      }}
                      address={this.state.address}
                      saveAddress={this.state.saveAddress}
                    />
                    {this.state.hasVoucher && (
                      <TouchableOpacity
                        onPress={() => this.continueWithVoucher()}
                        style={{
                          height: 50,
                          backgroundColor: colors.action,
                          alignItems: "center",
                          justifyContent: "center",
                          margin: 8,
                          marginTop: 0,
                          borderRadius: 4
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 16
                          }}
                        >
                          Buy with voucher{" "}
                          {this.getVoucherPrice(product) > 0 ? (
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "normal",
                                fontSize: 12
                              }}
                            >
                              (+{this.getVoucherPrice(product)}{" "}
                              <Icon name="coin" size={12} /> shipping)
                            </Text>
                          ) : (
                            ""
                          )}
                        </Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={() => this.continueWithCoins()}
                      style={{
                        height: 50,
                        backgroundColor: colors.action,
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 8,
                        marginTop: 0,
                        borderRadius: 4
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16
                        }}
                      >
                        Buy for {this.getTotalPrice(product)}{" "}
                        <Icon name="coin" size={16} />
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                )}
                {this.state.status == "confirmation" && (
                  <ScrollView style={{ flex: 1 }}>
                    <View style={{ height: 8 }} />
                    <ShopItem {...product} noLink={true} />
                    <View
                      style={{
                        backgroundColor: "white",
                        margin: 8,
                        marginTop: 0,
                        borderRadius: 4,
                        padding: 8,
                        paddingTop: 4
                      }}
                    >
                      <Text
                        style={{
                          color: colors.background,
                          fontWeight: "bold",
                          fontSize: 16,
                          marginBottom: 8
                        }}
                      >
                        Shipping:
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                            {
                              product.shippingOptions[this.state.shippingOption]
                                .name
                            }
                          </Text>
                          <Text>
                            {product.shippingOptions[this.state.shippingOption]
                              .tracking
                              ? "Tracking available"
                              : "No tracking"}
                          </Text>
                          <Text>
                            {
                              product.shippingOptions[this.state.shippingOption]
                                .time
                            }
                          </Text>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                          {
                            product.shippingOptions[this.state.shippingOption]
                              .price
                          }{" "}
                          <Icon size={14} color={colors.action} name="coin" />
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          marginBottom: 4,
                          marginTop: 8
                        }}
                      >
                        Ship to:
                      </Text>
                      <Text style={{ marginBottom: 8 }}>
                        {this.state.address}
                      </Text>
                      {this.state.saveAddress && (
                        <Text>Saving address for future orders.</Text>
                      )}
                      {!this.state.saveAddress && (
                        <Text>Address wont be saved for future orders.</Text>
                      )}
                    </View>
                    <View
                      style={{
                        backgroundColor: "white",
                        margin: 8,
                        marginTop: 0,
                        borderRadius: 4,
                        padding: 8
                      }}
                    >
                      <Text
                        style={{
                          color: colors.background,
                          fontWeight: "bold",
                          fontSize: 16,
                          marginBottom: 8
                        }}
                      >
                        Payment:
                      </Text>
                      {this.state.useVoucher && (
                        <Text>
                          1 voucher{" "}
                          {this.getVoucherPrice(product) > 0 ? (
                            <Text
                              style={{
                                fontWeight: "normal",
                                fontSize: 12
                              }}
                            >
                              (+{this.getVoucherPrice(product)}{" "}
                              <Icon
                                name="coin"
                                color={colors.action}
                                size={12}
                              />{" "}
                              shipping)
                            </Text>
                          ) : (
                            ""
                          )}
                        </Text>
                      )}
                      {!this.state.useVoucher && (
                        <Text>
                          {this.getTotalPrice(product)}{" "}
                          <Icon name="coin" color={colors.action} size={12} />{" "}
                          from balance
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.placeOrder(product);
                      }}
                      style={{
                        height: 50,
                        backgroundColor: colors.action,
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 8,
                        marginTop: 0,
                        borderRadius: 4
                      }}
                    >
                      {this.state.orderLoading ? (
                        <ActivityIndicator />
                      ) : (
                        <React.Fragment>
                          {this.state.orderStatus == "start" && (
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 16
                              }}
                            >
                              Confirm & place order
                            </Text>
                          )}
                          {this.state.orderStatus == "done" && (
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 16
                              }}
                            >
                              Order placed!
                            </Text>
                          )}
                          {this.state.orderStatus == "error" && (
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 16
                              }}
                            >
                              Error.
                            </Text>
                          )}
                        </React.Fragment>
                      )}
                    </TouchableOpacity>
                  </ScrollView>
                )}
              </React.Fragment>
            );
          }}
        </ItemLoader>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyProduct);
