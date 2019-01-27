import React, { Component } from "react";
import { Text, View } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

export default class Crates extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Crates" />
      </Wrapper>
    );
  }
}
