import React, { Component } from "react";
import { Text, View } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Button from "../atoms/Button";

export default class Settings extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Account" />
        <Button title="My Crates" path="MyCrates" />
        <Button />
        <Button />
      </Wrapper>
    );
  }
}
