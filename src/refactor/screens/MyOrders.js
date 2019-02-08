import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Order from "../components/Order";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getUID } from "../../lib";
import InfiniteList from "../components/InfiniteList";
import colors from "../../colors";

export class MyOrders extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Orders" showBack />
        <InfiniteList
          header={<View style={{ height: style.space }} />}
          loading={<Order loading />}
          collection={"orders"}
          where={["user", "==", getUID()]}
          orderBy={"time"}
          renderItem={i => {
            return <Order {...i} />;
          }}
        />
      </Wrapper>
    );
  }
}

export default MyOrders;
