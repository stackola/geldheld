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
import Challenge from "../components/Challenge";
import ProductRow from "../components/ProductRow";
import Order from "../components/Order";
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
          <Challenge
            complete={2}
            total={5}
            title={"5 Freunde werben"}
            text={"Wenn sie 5 Freunde werben erhalten sie einen Preis!"}
          />
          <Challenge
            continous
            complete={80}
            total={120}
            title={"120 Coins verdienen"}
            text={
              "Verdienen Sie 120 Coins mit Aufgaben, um diese Belohnung zu erhalten."
            }
          />
          <Transaction amount={1040} />
          <Transaction amount={-100} />
          <Transaction amount={0} />
          <Button inLine green />
          <ProductRow />
          <Order />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Home;
