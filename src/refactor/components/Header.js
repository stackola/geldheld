import React, { Component } from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import style from "../../style";

import UserButton from "./UserButton";
export class Header extends Component {
  goBack() {
    this.props.navigation.goBack();
  }
  render() {
    let showBack = this.props.showBack;
    return (
      <View
        style={{
          height: 60,
          backgroundColor: colors.lightTransparent,
          marginTop: StatusBar.currentHeight,
          alignItems: "center",
          flexDirection: "row",
          borderColor: "hsla(240, 35%, 11%, 1)",
          borderBottomWidth: 1
        }}
      >
        <StatusBar
          translucent={true}
          backgroundColor={colors.lightTransparent}
          barStyle={"light-content"}
        />
        {showBack && (
          <TouchableOpacity
            onPress={() => {
              this.goBack();
            }}
            style={{
              width: 60,
              height: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="chevron-left" size={40} color={colors.text} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontWeight: "100",
            color: "#eee",
            marginLeft: showBack
              ? style.containerPadding
              : style.space + style.containerPadding,
            fontSize: 20,
            fontFamily: "sans-serif-light"
          }}
        >
          {this.props.title}
        </Text>
        <View style={{ flex: 1 }} />
        <UserButton hide={false} />
      </View>
    );
  }
}

export default withNavigation(Header);
