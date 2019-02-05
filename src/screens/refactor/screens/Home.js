import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Button from "../components/Button";
import Well from "../components/Well";
import DeleteableMessage from "../components/DeleteableMessage";
import StandardBox from "../components/StandardBox";

import style from "../../../style";
import Offer from "../components/Offer";
import Transaction from "../components/Transaction";
import colors from "../../../colors";
export class Home extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <ScrollView>
          <View style={{ height: style.space }} />
          <DeleteableMessage green />
          <Offer />
          <Well />
          <Transaction amount={1040} />
          <Transaction amount={-100} />
          <Transaction amount={0} />
          <Button inLine green />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Home;
