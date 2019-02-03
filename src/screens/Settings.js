import React, { Component } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Button from "../atoms/Button";

export default class Settings extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Account" />
        <ScrollView style={{ flex: 1 }}>
          <Button title="My Crates" path="MyCrates" />
          <Button title="My Vouchers" path="MyVouchers" />
          <Button title="My Transactions" path="MyTransactions" />
          <Button title="My Orders" path="MyOrders" />
          <Button title="My Profile" path="MyProfile" />
          <Button title="IAP" path="IAP" />
          <Button title="My Friends" path="MyFriends" />
        </ScrollView>
      </Wrapper>
    );
  }
}
