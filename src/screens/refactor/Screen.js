import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

const space = 12;
const bigBorderRadius = 8;
const smallBorderRadius = 4;
const containerPadding = 8;
export class Screen extends Component {
  render() {
    return (
      <ImageBackground
        source={{ uri: "background3" }}
        style={{ flex: 1, width: "100%" }}
      >
        <StatusBar
          translucent={true}
          backgroundColor={"hsla(0,0%,0%,0.2)"}
          barStyle={"light-content"}
        />
        <View
          style={{
            height: 60,
            backgroundColor: "hsla(0,0%,0%,0.2)",
            marginTop: StatusBar.currentHeight,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontWeight: "100",
              color: "#eee",
              marginLeft: space,
              fontSize: 20,
              fontFamily: "sans-serif-light"
            }}
          >
            Home
          </Text>
        </View>
        <View
          style={{
            height: 150,
            backgroundColor: "#44dd2244",
            borderRadius: bigBorderRadius,
            margin: space,
            marginBottom: 0,
            padding: containerPadding,
            paddingTop: containerPadding / 2,
            paddingBottom: containerPadding / 2
          }}
        >
          <Text style={{ color: "white" }}>Hellp</Text>
          <Button noFlex green />
        </View>
        <Well />
        <View
          style={{
            flexDirection: "row",
            margin: space / 2,
            marginBottom: space / 2,
            marginTop: space
          }}
        >
          <Button orange />
          <Button red />
          <Button green />
        </View>
        <View style={{ flexDirection: "row", margin: space / 2 }}>
          <Button />
        </View>
      </ImageBackground>
    );
  }
}

export default Screen;

let Well = props => {
  return (
    <LinearGradient
      colors={[
        "hsla(240, 35%, 12%, 1)",
        "hsla(240, 35%, 14%, 1)",
        "hsla(240, 35%, 14%, 1)",
        "hsla(240, 35%, 12%, 1)"
      ]}
      style={{
        height: 100,
        marginTop: space,
        borderColor: "hsla(240, 35%, 11%, 1)",
        borderBottomWidth: 2,
        borderTopWidth: 2
      }}
    />
  );
};

let Button = props => {
  let o = "8";
  let color = "#ddd" + o;
  if (props.green) {
    color = "#44dd22" + o + o;
  }
  if (props.red) {
    color = "#e00" + o;
  }
  if (props.orange) {
    color = "#ff4500" + o + o;
  }
  if (props.color) {
    color = props.color;
  }
  return (
    <TouchableOpacity
      style={{
        flex: props.noFlex || props.inLine ? 0 : 1,
        height: 50,
        margin: props.noFlex || props.inLine ? 0 : space / 2,
        marginTop: 0,
        marginBottom: 0,
        borderRadius: smallBorderRadius,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold"
        }}
      >
        Send
      </Text>
    </TouchableOpacity>
  );
};
