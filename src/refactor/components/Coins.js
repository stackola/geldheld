import React, { Component } from "react";
import { Text, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import style from "../../style";
import { formatMoney } from "../../lib";

export default class Coins extends Component {
  render() {
    return (
      <React.Fragment>
        <Text
          style={[
            style.text,
            { fontWeight: "bold", color: this.props.color || colors.text }
          ]}
        >
          {formatMoney(this.props.amount)}{" "}
        </Text>
        <Icon
          name="coin"
          color={this.props.color || colors.coin}
          size={style.text.fontSize}
        />
      </React.Fragment>
    );
  }
}
