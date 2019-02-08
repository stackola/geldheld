import React, { Component } from "react";
import ProductSquare from "./ProductSquare";
import Title from "./Title";
import style from "../../style";
import Well from "./Well";

import { Text, View, ScrollView, FlatList } from "react-native";
import ItemLoader from "./ItemLoader";

export default class ShopList extends Component {
  render() {
    let listId = this.props.listId || "featured-1";
    return (
      <View style={{ flex: 1, marginBottom: 8 }}>
        <ItemLoader
          path={"lists/" + listId}
          loadingComponent={
            <React.Fragment>
              <Title
                style={{
                  paddingTop: 10,
                  paddingLeft: style.space + style.containerPadding
                }}
              >
                ...
              </Title>
              <Well>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: style.space }} />
                  <ProductSquare loading />
                </View>
              </Well>
            </React.Fragment>
          }
        >
          {list => {
            return (
              <React.Fragment>
                <Title
                  style={{
                    paddingTop: 10,
                    paddingLeft: style.space + style.containerPadding
                  }}
                >
                  {list.name}
                </Title>
                <Well>
                  <FlatList
                    horizontal={true}
                    ListHeaderComponent={
                      <View style={{ width: style.space }} />
                    }
                    data={list.products}
                    keyExtractor={(i)=>Math.random().toString()}
                    renderItem={i => {
                      return (
                        <ItemLoader
                          path={"products/" + i.item}
                          loadingComponent={<ProductSquare loading />}
                        >
                          {po => {
                            return <ProductSquare {...po} />;
                          }}
                        </ItemLoader>
                      );
                    }}
                  />
                </Well>
              </React.Fragment>
            );
          }}
        </ItemLoader>
      </View>
    );
  }
}
