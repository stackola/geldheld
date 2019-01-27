import React, { PureComponent } from "react";
import { Text, View, Image } from "react-native";
import colors from "../colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class CrateContent extends PureComponent {
  render() {
    return (
      <View
        style={{
          marginRight: 8,
          marginLeft: 8,
          backgroundColor: "white",
          marginBottom: 8,
          borderRadius: 4,
          height: 120,
          alignItems: "center",
          justifyContent: "center",
          width: 120
        }}
      >
        {this.props.type == "coins" && (
          <View
            style={{
              width: 60,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="coin" size={25} color={colors.action} />
          </View>
        )}
        {this.props.type == "product" && (
          <Image
            style={{
              width: 60,
              height: 60
            }}
            resizeMode={"contain"}
            source={{ uri: this.props.image }}
          />
        )}
        {this.props.type == "crate" && (
          <View>
            <Icon name="cube-outline" size={25} color={colors.action} />
          </View>
        )}
        <Text style={{ color: colors.background, fontWeight: "bold" }}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}
