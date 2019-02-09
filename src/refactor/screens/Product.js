import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
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

export class Product extends Component {
  render() {
    return (
      <Wrapper>
        <Header showBack />
        <ScrollView style={{}}>
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
              sodales in odio a molestie. Sed nec nunc nisl. Vestibulum ac arcu
              tincidunt, vehicula lorem non, interdum eros. In imperdiet
              vulputate fermentum.
            </SText>
            <Spacer size={4} />
            <RatingBox />
            <Spacer size={2} />
          </StandardBox>
          <ColorButton hue={120} medium center>
            <Icon name="cart" color={colors.text} size={20} /> Buy
          </ColorButton>
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
