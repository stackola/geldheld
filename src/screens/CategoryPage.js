import React, { Component } from "react";
import { Text, View } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Button from "../atoms/Button";
import InfiniteList from "../components/InfiniteList";
import ShopItem from "../atoms/ShopItem";

export default class CategoryPage extends Component {
  render() {
    let category = this.props.category || "Gadgets";
    return (
      <Wrapper>
        <Header title="Category" showBack={true} />
        <InfiniteList
          where={["category", "==", category]}
          collection="products"
          style={{}}
          header={<View style={{ height: 8 }} />}
          orderBy="popularity"
          noRefresh={true}
          renderItem={p => {
            return <ShopItem {...p} />;
          }}
        />
      </Wrapper>
    );
  }
}
