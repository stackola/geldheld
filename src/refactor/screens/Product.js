import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
  Image
} from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import Challenge from "../components/Challenge";
import Spacer from "../components/Spacer";
import TopContainer from "../components/TopContainer";
import StandardBox from "../components/StandardBox";
import SText from "../components/SText";
import Title from "../components/Title";
import RatingBox from "./RatingBox";
import ColorButton from "../components/ColorButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import Coins from "../components/Coins";
import Review from "../components/Review";
import BuyProductBox from "../components/BuyProductBox";
import ItemLoader from "../components/ItemLoader";
import InfiniteList from "../components/InfiniteList";
import ShippingOption from "./ShippingOption";

export class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buying: false
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    let productId = this.props.navigation.getParam("productId", null);
    return (
      <ItemLoader
        loadingComponent={
          <Wrapper>
            <Header showBack />
            <Spacer />
            <StandardBox loading loadingHeight={200} />
          </Wrapper>
        }
        path={"products/" + productId}
      >
        {prod => {
          return (
            <Wrapper>
              <Header showBack />
              <InfiniteList
                path={"products/" + productId}
                collection={"reviews"}
                loading={
                  <StandardBox
                    loading
                    loadingHeight={200}
                    style={{ marginTop: style.space }}
                  />
                }
                renderItem={i => {
                  return <Review {...i} />;
                }}
                header={
                  <View>
                    <TopContainer style={{ paddingTop: style.space }}>
                      <ScrollView horizontal style={{}}>
                        <Spacer horizontal />
                        <ProductImage />
                        <ProductImage />
                        <ProductImage />
                        <ProductImage />
                      </ScrollView>
                      <Spacer />
                    </TopContainer>
                    <Spacer />
                    <StandardBox>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Title>
                          {prod.name} {productId}
                        </Title>
                        <View style={{ flex: 1 }} />
                        <Coins amount={prod.price} />
                      </View>
                      <SText>{prod.text}</SText>
                      <Spacer />
                      <RatingBox
                        count={prod.ratingCount}
                        rating={prod.rating}
                      />
                      <Spacer size={2} />
                    </StandardBox>

                    <BuyProductBox
                      {...prod}
                      buying={this.state.buying}
                      onPress={() => {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.easeInEaseOut
                        );
                        this.setState({ buying: !this.state.buying });
                      }}
                    />
                    {!this.state.buying && (
                      <StandardBox>
                        <Title>Shipping options</Title>
                        {prod.shippingOptions.map((s, index) => {
                          return <ShippingOption key={index} {...s} />;
                        })}

                        <Spacer size={4} />
                      </StandardBox>
                    )}
                  </View>
                }
              />
            </Wrapper>
          );
        }}
      </ItemLoader>
    );
  }
}

export default Product;

let ProductImage = p => {
  return (
    <View
      style={{
        marginRight: style.space,
        borderRadius: style.bigBorderRadius,
        overflow: "hidden",
        backgroundColor: "white"
      }}
    >
      <Image
        style={{
          height: 200,
          width: 250,
          backgroundColor: "white"
        }}
        resizeMode={"contain"}
        source={{ uri: "https://i.imgur.com/xBjQ6Ld.png" }}
      />
    </View>
  );
};
