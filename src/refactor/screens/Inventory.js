import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import Challenge from "../components/Challenge";

export class Inventory extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Inventory" />
        <ScrollView style={{}}>
          <View style={{ height: style.space }} />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Inventory;
