import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";

export class MyVouchers extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Vouchers" showBack />
        <ScrollView style={{ flex: 1 }} />
      </Wrapper>
    );
  }
}

export default MyVouchers;
