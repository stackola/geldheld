import React, { Component } from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native";
import colors from "../colors";
import UserButton from "../atoms/UserButton";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
class Header extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.headerBackground,
          height: 60,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          flexDirection: "row"
        }}
      >
        {this.props.showBack ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              width: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="close" size={25} color={colors.background} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 8 }} />
        )}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              color: colors.background,
              fontSize: 17,
              fontWeight: "bold"
            }}
          >
            {this.props.title}
          </Text>
        </View>
        <UserButton hide={this.props.hideBalance} />
      </View>
    );
  }
}

export default withNavigation(Header);
