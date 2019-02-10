import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Transaction from "../components/Transaction";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import InfiniteList from "../components/InfiniteList";
import { getUID } from "../../lib";

export class MyTransactions extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Transactions" showBack />
        <InfiniteList
          header={<View style={{ height: style.space }} />}
          loading={<Transaction loading />}
          path={"users/" + getUID()}
          collection={"transactions"}
          orderBy={"time"}
          renderItem={i => {
            return <Transaction {...i} />;
          }}
        />
      </Wrapper>
    );
  }
}

export default MyTransactions;
