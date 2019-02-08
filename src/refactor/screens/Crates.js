import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";

export class Crates extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Crates" />
        <ScrollView style={{ marginTop: style.space, marginLeft: style.space }}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <CrateButton hue={199} name={"Tiny crate"} price={100} />
            <CrateButton hue={213} name={"Gadget crate"} price={200} />
          </View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <CrateButton hue={118} name="Fashion crate" price={1000} />
            <CrateButton hue={0} name="Premium crate" price={2500} />
          </View>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Crates;
