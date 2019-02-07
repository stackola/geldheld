import React, { Component } from "react";
import { Text, View } from "react-native";
import colors from "../../../colors";
import style from "../../../style";

export default class ContinousBar extends Component {
  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: style.space,
            marginBottom: style.space
          }}
        >
          <View
            style={{
              backgroundColor: "#7779",
              height: 15,
              flex: 1,
              borderRadius: 6
            }}
          >
            <View
              style={{
                backgroundColor: colors.green,
                height: 15,
                width: (this.props.complete / this.props.total) * 100 + "%",
                borderRadius: 6
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
