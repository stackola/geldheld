import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import ShopItemSquare from "../atoms/ShopItemSquare";
import ShopCategory from "../components/ShopCategory";

export default class Shop extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Shop" />
        <ScrollView>
          <View style={{ height: 8 }} />
          <ShopCategory category={"Gadgets"} />
          <ShopCategory category={"Gadgets"} />
          <ShopCategory category={"Gadgets"} />
          <ShopCategory category={"Gadgets"} />
          <ShopCategory category={"Gadgets"} />
        </ScrollView>
      </Wrapper>
    );
  }
}
