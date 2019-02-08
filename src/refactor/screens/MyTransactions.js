import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";

export class MyTransactions extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Transactions" showBack />
        <ScrollView style={{ flex: 1 }} />
      </Wrapper>
    );
  }
}

export default MyTransactions;
