import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import ShopItemSquare from "../atoms/ShopItemSquare";
import InfiniteList from "./InfiniteList";
import ItemLoader from "./ItemLoader";
export default class ShopCategory extends Component {
  render() {
    let listId = this.props.listId;
    return (
      <View style={{ flex: 1, marginBottom: 8 }}>
        <ItemLoader path={"lists/" + listId}>
          {list => {
            return (
              <React.Fragment>
                <Text
                  style={{ color: "white", marginBottom: 4, paddingLeft: 8 }}
                >
                  {list.name}
                </Text>
                <FlatList
                  horizontal={true}
                  ListHeaderComponent={<View style={{ width: 8 }} />}
                  data={list.products}
                  renderItem={i => {
                    return (
                      <ItemLoader path={"products/" + i.item}>
                        {po => {
                          return <ShopItemSquare {...po} />;
                        }}
                      </ItemLoader>
                    );
                  }}
                />
              </React.Fragment>
            );
          }}
        </ItemLoader>
      </View>
    );
  }
}
