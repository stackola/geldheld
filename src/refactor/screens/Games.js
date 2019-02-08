import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

export class Games extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Games" />
        <ScrollView />
      </Wrapper>
    );
  }
}

export default Games;
