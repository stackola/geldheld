import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import Challenge from "../components/Challenge";
import ColorButton from "../components/ColorButton";

import Entypo from "react-native-vector-icons/Entypo";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";

export class Inventory extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Inventory" />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: style.space }} />
          <ColorButton
            hue={11}
            text="My Crates"
            icon={<Icon name="cube-outline" color={colors.text} size={40} />}
          />
          <ColorButton
            text="My Voucers"
            hue={90}
            icon={<Entypo name="ticket" color={colors.text} size={40} />}
          />
          <ColorButton
            text="My Orders"
            hue={198}
            icon={<Icon name="truck-fast" color={colors.text} size={40} />}
          />
          <ColorButton
            text="My Friends"
            hue={214}
            icon={<Icon name="account-plus" color={colors.text} size={40} />}
          />

          <ColorButton
            text="My Transactions"
            hue={40}
            icon={<Icon name="bank-transfer" color={colors.text} size={40} />}
          />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Inventory;
