import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CollectionLoader from "../components/CollectionLoader";
import Offer from "../components/Offer";

export default class Earn extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Earn Points!" />
        <CollectionLoader
          collection="offers"
          renderItem={i => {
            return <Offer data={i.item} />;
          }}
        />
      </Wrapper>
    );
  }
}
