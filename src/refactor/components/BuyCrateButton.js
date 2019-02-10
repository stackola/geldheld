import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import { buyCrate, navToUserCrate, validate } from "../../lib";
import { StackActions, NavigationActions } from "react-navigation";

import style from "../../style";

import { withNavigation } from "react-navigation";
import ColorButton from "./ColorButton";

class BuyCrateButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "start"
    };
  }
  componentDidMount() {}
  pressed() {
    if (this.state.status == "error" || this.state.status == "done") {
      this.setState({ status: "start" });
      return;
    }
    if (this.state.status == "start") {
      this.buy();
    }
  }
  render() {
    let props = this.props;
    return (
      <ColorButton
        center
        small
        hue={40}
        loading={this.state.status == "loading"}
        error={this.state.status == "error"}
        done={this.state.status == "done"}
        onPress={() => {
          this.pressed();
        }}
      >
        1 <Icon name="cube-outline" color={colors.text} size={20} /> for{"! "}
        {props.price} <Icon name="coin" color={colors.text} size={20} />
      </ColorButton>
    );
  }

  buy() {
    let crateId = this.props.id;
    this.setState({ status: "loading" }, () => {
      buyCrate(crateId).then(r => {
        console.log(r);
        if (r.data.status == "ok") {
          this.setState({ status: "done" }, () => {
            //this.props.navigation.navigate(navToUserCrate(r.data.userCrate));
            this.props.navigation.navigate("MyCrates");
          });
        } else {
          this.setState({ status: "error" }, () => {});
        }
      });
    });
  }
}

export default withNavigation(BuyCrateButton);
