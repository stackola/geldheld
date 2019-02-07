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
import Title from "../components/Title";
import colors from "../../../colors";
import ProgressBar from "../components/ProgressBar";
import SText from "../components/SText";
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
          <StandardBox>
            <Title text="5 Freunde werben" />
            <SText text="Wenn sie 5 Freunde werben erhalten sie einen Preis!" />
            <ProgressBar total={5} complete={3} />
          </StandardBox>
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
