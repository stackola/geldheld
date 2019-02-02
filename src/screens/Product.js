import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import ItemLoader from "../components/ItemLoader";
import ProductHead from "../atoms/ProductHead";
import colors from "../colors";
import Review from "../components/Review";
import InfiniteList from "../components/InfiniteList";
import { navToBuy } from "../lib";
import { connect } from "react-redux";
import { ActionCreators } from "../redux/actions";
import { bindActionCreators } from "redux";
import RatingBox from "../components/RatingBox";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewStatus: "start"
    };
  }

  render() {
    let productId = this.props.navigation.getParam("productId", null);
    let hasBought =
      this.props.user.boughtProducts &&
      this.props.user.boughtProducts.includes(productId);

    let hasReviewed =
      this.props.user.reviewedProducts &&
      this.props.user.reviewedProducts.includes(productId);
    return (
      <Wrapper>
        <Header title="Product!" showBack={true} />
        <InfiniteList
          style={{}}
          header={
            <ItemLoader path={"products/" + productId}>
              {product => {
                return (
                  <View style={{ flex: 1, paddingLeft: 8, paddingRight: 8 }}>
                    <View style={{ height: 8 }} />
                    <ProductHead {...product} />
                    <View
                      style={{
                        backgroundColor: "white",
                        marginTop: 8,
                        padding: 8,
                        borderRadius: 4
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontWeight: "bold",
                            color: colors.background,
                            fontSize: 24
                          }}
                        >
                          {product.name}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          100{" "}
                          <Icon name="coin" size={16} color={colors.action} />
                        </Text>
                      </View>
                      <View style={{ marginTop: 4 }}>
                        <Text style={{ fontSize: 16 }}>{product.text}</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: "white",
                        marginTop: 8,
                        padding: 8,
                        borderRadius: 4
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: "bold",
                          color: colors.background,
                          fontSize: 18,
                          marginBottom: 8
                        }}
                      >
                        Shipping options
                      </Text>
                      {product.shippingOptions.map(o => {
                        return (
                          <View
                            key={o.name}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: 8
                            }}
                          >
                            <View style={{ flex: 1 }}>
                              <Text
                                style={{ fontWeight: "bold", fontSize: 15 }}
                              >
                                {o.name}
                              </Text>
                              <Text>
                                {o.tracking
                                  ? "Tracking available"
                                  : "No tracking"}
                              </Text>
                              <Text>{o.time}</Text>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                              {o.price}{" "}
                              <Icon
                                size={14}
                                color={colors.action}
                                name="coin"
                              />
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("navigating", navToBuy(product.id));
                        this.props.navigation.navigate(navToBuy(product.id));
                      }}
                      style={{
                        height: 50,
                        backgroundColor: colors.action,
                        borderRadius: 4,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 8
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "white",
                          fontWeight: "bold"
                        }}
                      >
                        Buy!
                      </Text>
                    </TouchableOpacity>
                    <RatingBox
                      ratingCount={product.ratingCount || 0}
                      rating={Math.floor(product.rating * 10) / 10}
                      hasBought={hasBought}
                      hasReviewed={hasReviewed}
                      productId={product.id}
                    />
                    <View style={{ height: 4 }} />
                  </View>
                );
              }}
            </ItemLoader>
          }
          path={"products/" + productId}
          collection={"reviews"}
          renderItem={i => {
            return <Review {...i} />;
          }}
        />
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
)(Product);
