import React, { Component } from "react";
import { Text, View } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

export default class Play extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Play" />
      </Wrapper>
    );
  }
}
