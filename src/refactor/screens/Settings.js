import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

import style from "../../style";
import colors from "../../colors";
import ProductRow from "../components/ProductRow";
import Spacer from "../components/Spacer";
export class Settings extends Component {
  render() {
    return (
      <Wrapper>
        <Header title={"Settings"} showBack />
        <ScrollView>
          <Spacer />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Settings;
