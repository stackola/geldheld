import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Voucher from "../components/Voucher";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import InfiniteList from "../components/InfiniteList";
import { getUID } from "../../lib";

export class MyVouchers extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My vouchers" showBack />
        <InfiniteList
          header={<View style={{ height: style.space }} />}
          loading={<Voucher loading />}
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

export default MyVouchers;
