import React, { Component } from "react";
import { Text, View } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

import InfiniteList from "../components/InfiniteList";

import { getUID } from "../lib";
import Voucher from "../atoms/Voucher";
export default class MyVoucers extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Vouchers" showBack={true} />
        <InfiniteList
          path={"users/" + getUID()}
          collection={"vouchers"}
          orderBy={"time"}
          renderItem={i => {
            return <Voucher {...i} />;
          }}
        />
      </Wrapper>
    );
  }
}
