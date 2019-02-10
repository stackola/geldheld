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
    return (
      <Wrapper>
        <Header showBack />
        <ScrollView style={{ flex: 1 }}>
          <React.Fragment>
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Title>Laser Pointer</Title>
                <View style={{ flex: 1 }} />
                <Coins amount={100} />
              </View>
              <SText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                sodales in odio a molestie. Sed nec nunc nisl. Vestibulum ac
                arcu tincidunt, vehicula lorem non, interdum eros. In imperdiet
                vulputate fermentum.
              </SText>
              <Spacer />
              <RatingBox />
              <Spacer size={2} />
            </StandardBox>
          </React.Fragment>

          <BuyProductBox
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

              <ShippingOption
                time={"4-5 weeks"}
                name={"Free shipping"}
                tracking={false}
                price={0}
              />

              <ShippingOption
                time={"12-24 days"}
                name={"Deluxe shipping"}
                tracking={true}
                price={255}
              />

              <ShippingOption
                time={"12-24 days"}
                name={"Super Deluxe shipping"}
                tracking={true}
                price={255}
              />

              <Spacer size={4} />
            </StandardBox>
          )}
          {!this.state.buying && (
            <React.Fragment>
              <Review />
              <Review />
              <Review />
            </React.Fragment>
          )}
        </ScrollView>
      </Wrapper>
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
