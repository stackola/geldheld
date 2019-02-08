import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import Challenge from "../components/Challenge";

export class Challenges extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Challenges" />
        <ScrollView style={{}}>
          <View style={{ height: style.space }} />
          <Challenge
            continous
            complete={80}
            total={120}
            title={"120 Coins verdienen"}
            text={
              "Verdienen Sie 120 Coins mit Aufgaben, um diese Belohnung zu erhalten."
            }
          />
          <Challenge
            complete={3}
            total={4}
            title={"5 Freunde werben"}
            text={"Werbe 5 Freunde, um diese Belohnung zu erhalten."}
          />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Challenges;
