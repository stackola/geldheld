import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import ShopItemSquare from "../atoms/ShopItemSquare";
import InfiniteList from "./InfiniteList";

export default class ShopCategory extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginBottom: 8 }}>
        <Text style={{ color: "white", marginBottom: 4 }}>Gadgets</Text>
        <InfiniteList
          collection="products"
          orderBy="popularity"
          horizontal={true}
          noRefresh={true}
          renderItem={p => {
            return <ShopItemSquare {...p} />;
          }}
        />
      </View>
    );
  }
}
