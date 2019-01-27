import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Title from "../atoms/Title";
import Crate from "../atoms/Crate";

export default class Crates extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Crates" />
        <ScrollView>
          <Title text="Your crates" />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingLeft: 8,
              paddingTop: 8
            }}
          >
            <Crate name={"Fashion crate"} color={"#1abc9c"} />
            <Crate name={"Fashion crate"} color={"#1abc9c"} />
            <Crate name={"Gadget Crate"} color={"#f1c40f"} />
          </View>
          <Title text="Store" />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingLeft: 8,
              paddingTop: 8
            }}
          >
            <Crate name={"Gadget crate"} price={100} color={"#f1c40f"} />
            <Crate name={"iPhone crate"} price={2000} color={"#2980b9"} />
            <Crate name={"Fortnite crate"} price={5000} color={"#e74c3c"} />
            <Crate name={"Fashion crate"} price={200} color={"#1abc9c"} />
          </View>
        </ScrollView>
      </Wrapper>
    );
  }
}
