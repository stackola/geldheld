import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";

import {
  StackActions,
  NavigationActions,
  withNavigation
} from "react-navigation";

let tabs = [
  { title: "Home", icon: "home-outline", routeName: "Home" },
  { title: "Games", icon: "gamepad", routeName: "Games" },
  { title: "Crates", icon: "cube-outline", routeName: "Crates" },
  { title: "Shop", icon: "cart-outline", routeName: "Shop" },
  { title: "Challenges", icon: "target", routeName: "Challenges" },
  { title: "Inventory", icon: "briefcase-outline", routeName: "Inventory" }
];

let Tab = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}
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
    </TouchableOpacity>
  );
};

export class TabBar extends Component {
  navTo(t) {
    let currentRoute = this.props.navigation.state.routeName;
    if (currentRoute == t) {
      return;
    }
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: t })]
    });
    this.props.navigation.dispatch(resetAction);
    //this.props.navigation.navigate(t);
  }
  render() {
    let Spacer = () => {
      return <View style={{ width: 0 }} />;
    };
    console.log(this.props.navigation);
    let currentRoute = this.props.navigation.state.routeName;
    if (
      tabs.filter(i => {
        return i.routeName == currentRoute;
      }).length == 0
    ) {
      return null;
    }
    return (
      <View
        style={{
          flexDirection: "row",
          height: 60,
          elevation: 1
        }}
      >
        {tabs.map(t => {
          return (
            <Tab
              {...t}
              key={t.routeName}
              active={currentRoute == t.routeName}
              onPress={() => {
                this.navTo(t.routeName);
              }}
            />
          );
        })}
      </View>
    );
  }
}

export default withNavigation(TabBar);
