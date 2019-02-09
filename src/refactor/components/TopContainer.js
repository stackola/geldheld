import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import style from "../../style";
import colors from "../../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StandardBox from "../components/StandardBox";

export class TopContainer extends Component {
  render() {
    return (
      <StandardBox noMargin noPadding noRadius style={{ ...this.props.style }}>
        {this.props.children}
      </StandardBox>
    );
  }
}

export default TopContainer;
