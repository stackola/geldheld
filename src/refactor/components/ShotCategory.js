import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import ProductSquare from "./ProductSquare";
import InfiniteList from "./InfiniteList";
import Title from "./Title";
import style from "../../style";
import Well from "./Well";

export default class ShopCategory extends Component {
  render() {
    let category = this.props.category || "Gadgets";
    return (
      <View style={{ flex: 1, marginBottom: 8 }}>
        <Title
          style={{
            paddingTop: 10,
            paddingLeft: style.space + style.containerPadding
          }}
        >
          {category}
        </Title>
        <Well>
          <InfiniteList
            where={["category", "==", category]}
            collection="products"
            header={<View style={{ width: style.space }} />}
            orderBy="popularity"
            horizontal={true}
            loading={<ProductSquare loading/>}
            noRefresh={true}
            renderItem={p => {
              return <ProductSquare {...p} />;
            }}
          />
        </Well>
      </View>
    );
  }
}
