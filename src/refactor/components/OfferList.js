import React, { Component } from "react";
import { Text, View } from "react-native";
import InfiniteList from "./InfiniteList";
import Offer from "./Offer";
import style from "../../style";

export default class OfferList extends Component {
  render() {
    return (
      <InfiniteList
        header={<View style={{ height: style.space }} />}
        loading={<Offer loading />}
        collection={"offers"}
        orderBy={"coins"}
        renderItem={i => {
          return <Offer {...i} />;
        }}
      />
    );
  }
}
