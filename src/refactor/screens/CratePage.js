import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import style from "../../style";
import colors from "../../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CrateButton from "../components/CrateButton";
import StandardBox from "../components/StandardBox";
import TopContainer from "../components/TopContainer";
import ColorButton from "../components/ColorButton";
import Spacer from "../components/Spacer";
import Title from "../components/Title";
import SText from "../components/SText";
import { formatMoney } from "../../lib";
import BuyCrateBox from "../components/BuyCrateBox";
import OpenCrateBox from "../components/OpenCrateBox";
import CrateContent from "../components/CrateContent";

export class CratePage extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Crate" showBack />
        <ScrollView style={{ flex: 1 }} header>
          <Spacer />
          <View
            style={{
              marginRight: style.space,
              marginLeft: style.space
            }}
          >
            <CrateButton
              hue={199}
              noLink
              name={"Tiny crate"}
              price={100}
              noMargin
            />
          </View>
          <Spacer />
          {false && <BuyCrateBox />}
          <OpenCrateBox hue={199} />
          <CrateContent />
        </ScrollView>
      </Wrapper>
    );
  }
}

export default CratePage;
