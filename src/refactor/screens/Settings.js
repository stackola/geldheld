import React, { Component } from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import style from "../../style";
import colors from "../../colors";
import ProductRow from "../components/ProductRow";
import Spacer from "../components/Spacer";
import StandardBox from "../components/StandardBox";
import Title from "../components/Title";
import ColorButton from "../components/ColorButton";
export class Settings extends Component {
  render() {
    return (
      <Wrapper>
        <Header title={"Settings"} showBack />
        <ScrollView>
          <Spacer />
          <StandardBox>
            <Title style={{ marginBottom: 0 }}>Stored shipping address:</Title>
            <TextInput
              placeholder={"Name\nAddress\nCity & ZIP code\nState & Country"}
              placeholderTextColor={colors.textMinor}
              onChangeText={t => {}}
              style={{
                color: colors.text,
                textAlignVertical: "top",
                borderBottomWidth: 2,
                borderColor: "#ddd"
              }}
              multiline={true}
              numberOfLines={4}
            />
            <Spacer />
            <ColorButton
              small
              noMargin
              center
              smallFont
              hue={220}
              style={{ marginBottom: style.space / 2 }}
            >
              Update
            </ColorButton>
          </StandardBox>
          {false && (
            <StandardBox style={{}}>
              <Title style={{ textAlign: "center" }}>
                <Icon name="check" size={16} color={colors.green} />{" "}
                Notifications enabled
              </Title>
              <Spacer />
              <ColorButton
                small
                noMargin
                smallFont
                center
                hue={10}
                style={{ marginBottom: style.space / 2 }}
                l={20}
              >
                Press to disable
              </ColorButton>
            </StandardBox>
          )}
          <StandardBox style={{}}>
            <Title style={{ textAlign: "center" }}>
              <Icon name="close" size={16} color={colors.red} /> Notifications
              disabled
            </Title>
            <Spacer />
            <ColorButton
              small
              noMargin
              smallFont
              center
              hue={130}
              style={{ marginBottom: style.space / 2 }}
              l={20}
            >
              Press to enable
            </ColorButton>
          </StandardBox>
          <ColorButton small smallFont center hue={220}>
            Link Facebook account
          </ColorButton>
          <ColorButton small smallFont center hue={200}>
            Link Twitter account
          </ColorButton>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default Settings;
