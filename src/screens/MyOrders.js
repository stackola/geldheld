import React, { Component } from "react";
import { Text, View } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import InfiniteList from "../components/InfiniteList";

import { getUID } from "../lib";
import UserCrateLoader from "../atoms/UserCrateLoader";
import { OrderItem } from "../atoms/OrderItem";
export default class MyOrders extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Orders" showBack={true} />
        <InfiniteList
          header={<View style={{ height: 8 }} />}
          collection={"orders"}
          where={["user", "==", getUID()]}
          orderBy={"time"}
          renderItem={i => {
            return <OrderItem {...i} />;
          }}
        />
      </Wrapper>
    );
  }
}
