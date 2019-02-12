import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import style from "../../style";
import ColorButton from "../components/ColorButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import StandardBox from "../components/StandardBox";
import Title from "../components/Title";
import Spacer from "../components/Spacer";

let ducks = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  3
];

export class Inventory extends Component {
  render() {
    let myDucks = shuffle(ducks);
    return (
      <Wrapper>
        <Header title="Pick-a-duck" showBack />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: style.space - 2 }} />
          <View
            style={{
              height: 400,
              marginLeft: style.space - 2,
              marginRight: style.space - 2
            }}
          >
            <Row items={myDucks.slice(0, 8)} />
            <Row items={myDucks.slice(8, 16)} />
            <Row items={myDucks.slice(16, 24)} />
            <Row items={myDucks.slice(24, 32)} />
            <Row items={myDucks.slice(32, 40)} />
            <Row items={myDucks.slice(40, 48)} />
            <Row items={myDucks.slice(48, 56)} />
            <Row items={myDucks.slice(56, 64)} />
          </View>
          <Spacer size={style.space - 2} />
          <StandardBox>
            <Title style={{ marginTop: 2, textAlign: "center" }}>Prizes:</Title>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name={"duck"} color={"grey"} size={40} />
                {"\n"}0x
              </Text>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name={"duck"} color={"orange"} size={40} />
                {"\n"}2x
              </Text>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name={"duck"} color={"red"} size={40} />
                {"\n"}5x
              </Text>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name={"duck"} color={"green"} size={40} />
                {"\n"}10x
              </Text>
            </View>
          </StandardBox>
          <ColorButton small center hue={120}>
            Shuffle
          </ColorButton>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Inventory;

function getDuckColor(v) {
  if (v == 0) {
    return "grey";
  }
  if (v == 1) {
    return "orange";
  }
  if (v == 2) {
    return "red";
  }
  if (v == 3) {
    return "green";
  }
}
let Duck = p => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 2,
        backgroundColor: colors.lightTransparent
      }}
    >
      <Icon name={"duck"} color={getDuckColor(p.value)} size={25} />
    </TouchableOpacity>
  );
};

let Row = p => {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      {p.items.map((i, index) => {
        return <Duck value={i} key={index} />;
      })}
    </View>
  );
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
