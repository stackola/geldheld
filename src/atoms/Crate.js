import React, { PureComponent } from "react";
import { Text, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../colors";
export default class Crate extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          borderColor: this.props.color,
          borderWidth: 4,
          minWidth: "30%",
          height: 120,
          backgroundColor: "white",
          borderRadius: 4,
          marginRight: 8,
          marginBottom: 8
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Icon
            style={{ padding: 0, margin: 0 }}
            name="cube-outline"
            size={50}
            color={this.props.color || colors.background}
          />
        </View>
        {(this.props.price || this.props.price == 0) && (
          <Text
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              textAlign: "right",
              lineHeight: 20,
              paddingRight: 4,
              fontWeight: "bold",
              color: colors.background
            }}
          >
            {this.props.price || "0"}{" "}
            <Icon name="coin" color={colors.action} size={15} />
          </Text>
        )}
        <Text
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            lineHeight: 30,
            backgroundColor: this.props.color,
            color: "white"
          }}
        >
          {this.props.name || "noname"}
        </Text>
      </View>
    );
  }
}
