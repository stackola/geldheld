import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import Challenge from "../components/Challenge";
import ProductSquare from "../components/ProductSquare";
import Well from "../components/Well";
import Title from "../components/Title";
import StandardBox from "../components/StandardBox";

export class Shop extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Shop" />
        <ScrollView style={{}}>
          <Title
            style={{
              paddingTop: 10,
              paddingLeft: style.space + style.containerPadding
            }}
          >
            Featured
          </Title>
          <Well>
            <View style={{ width: style.space }} />
            <ProductSquare />
            <ProductSquare />
          </Well>
          <Title
            style={{
              paddingTop: 10,
              paddingLeft: style.space + style.containerPadding
            }}
          >
            Gadgets
          </Title>
          <Well>
            <View style={{ width: style.space }} />
            <ProductSquare />
            <ProductSquare />
          </Well>
          <Title
            style={{
              paddingTop: 10,
              paddingLeft: style.space + style.containerPadding
            }}
          >
            Fashion
          </Title>
          <Well>
            <View style={{ width: style.space }} />
            <ProductSquare />
            <ProductSquare />
          </Well>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Shop;
