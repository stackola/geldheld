import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import style from "../../style";
import colors from "../../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CrateButton from "../components/CrateButton";
import ItemLoader from "../components/ItemLoader";
import StandardBox from "../components/StandardBox";
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
    let crateId = this.props.navigation.getParam("crateId", null);
    return (
      <ItemLoader
        path={"crates/" + crateId}
        loadingComponent={
          <Wrapper>
            <Header title="..." showBack />
            <Spacer />
            <StandardBox loading />
          </Wrapper>
        }
      >
        {crate => {
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
                  <CrateButton noLink noMargin {...crate} />
                </View>
                <Spacer />
                {true && <BuyCrateBox {...crate} />}
                {true && <OpenCrateBox hue={199} {...crate} />}
                <CrateContent items={crate.items} />
              </ScrollView>
            </Wrapper>
          );
        }}
      </ItemLoader>
    );
  }
}

export default CratePage;
