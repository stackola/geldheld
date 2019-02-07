import React, { Component } from "react";
import { Text, View } from "react-native";
import style from "../../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../colors";

let Tab = props => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingBottom: 4,
        borderColor: "hsla(240, 35%, 11%, 1)",
        borderTopWidth: 1,
        backgroundColor: props.active
          ? colors.darkTransparent
          : colors.lightTransparent
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon
          color={props.active ? colors.action : colors.text + "9"}
          name={props.icon}
          size={props.active ? 25 : 20}
        />
      </View>
      <Text style={{ color: colors.text, fontSize: 11 }}>{props.title}</Text>
    </View>
  );
};

export class TabBar extends Component {
  render() {
    let Spacer = () => {
      return <View style={{ width: 0 }} />;
    };
    return (
      <View
        style={{
          flexDirection: "row",
          height: 60,
          elevation: 1
        }}
      >
        <Tab title={"Home"} icon={"home-outline"} />
        <Spacer />
        <Tab title={"Games"} icon={"gamepad"} />
        <Spacer />
        <Tab title={"Crates"} icon={"cube-outline"} active />
        <Spacer />
        <Tab title={"Shop"} icon={"cart-outline"} />
        <Spacer />
        <Tab title={"Inventory"} icon={"briefcase-outline"} />
      </View>
    );
  }
}

export default TabBar;
