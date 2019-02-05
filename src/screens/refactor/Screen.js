import React, { Component } from "react";
import { Text, View, ImageBackground, StatusBar } from "react-native";

export class Screen extends Component {
  render() {
    return (
      <ImageBackground
        source={{ uri: "background" }}
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
              marginLeft: 8,
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
            borderRadius: 6,
            margin: 12,
            marginBottom: 0
          }}
        >
          <Text style={{ color: "white" }}>Hellp</Text>
          <Button noFlex />
        </View>
        <View
          style={{
            height: 150,
            backgroundColor: "hsla(0,0%,0%,0.3)",
            borderRadius: 6,
            margin: 12,
            marginBottom: 0
          }}
        >
          <Text style={{ color: "white" }}>Hellp</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 6,
            marginBottom: 6,
            marginTop: 12
          }}
        >
          <Button color="green" />
          <Button color="red" />
          <Button />
        </View>
        <View style={{ flexDirection: "row", margin: 6 }}>
          <Button color="green" />
        </View>
      </ImageBackground>
    );
  }
}

export default Screen;

let Button = props => {
  let color = "#ddd5";
  if (props.color == "green") {
    color = "#44dd2255";
  }
  if (props.color == "red") {
    color = "#e005";
  }
  return (
    <View
      style={{
        flex: props.noFlex||props.inLine ? 0 : 1,
        height: 50,
        margin: 6,
        marginTop: 0,
        marginBottom: 0,
        borderRadius: 6,
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
    </View>
  );
};
