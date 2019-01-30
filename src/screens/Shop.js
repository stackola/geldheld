import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import ShopItemSquare from "../atoms/ShopItemSquare";
import ShopCategory from "../components/ShopCategory";
import Button from "../atoms/Button";

export default class Shop extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Shop" />
        <ScrollView>
          <Button path="CategoryPage" title="Category" />
          <View style={{ height: 8 }} />
          <ShopCategory category={"Gadgets"} />
          <ShopCategory category={"Fashion"} />
        </ScrollView>
      </Wrapper>
    );
  }
}
