import React, { Component } from "react";
import { Text, View } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import format from "date-fns/format";
import InfiniteList from "../components/InfiniteList";

import { getUID } from "../lib";
import Voucher from "../atoms/Voucher";
export default class MyTransactions extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Transactions" showBack={true} />
        <InfiniteList
          path={"users/" + getUID()}
          collection={"transactions"}
          orderBy={"time"}
          renderItem={i => {
            return Tx(i);
          }}
        />
      </Wrapper>
    );
  }
}

function Tx(props) {
  return (
    <View
      style={{
        height: 40,
        backgroundColor: "white",
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 8
      }}
    >
      <Text
        style={{
          width: 80,
          textAlign: "center",
          color: props.amount > 0 ? "green" : "red"
        }}
      >
        {props.amount > 0 ? "+" : ""}
        {props.amount}
      </Text>
      <Text style={{ flex: 1 }}>{props.text}</Text>
      <Text style={{ fontSize: 11, textAlign: "center" }}>
        {format(props.time, "YYYY/MM/DD")}
        {"\n"}
        {format(props.time, "HH:mm")}
      </Text>
    </View>
  );
}
