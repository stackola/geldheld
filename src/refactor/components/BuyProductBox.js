import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, Switch } from "react-native";
import ColorButton from "./ColorButton";

import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../colors";
import StandardBox from "./StandardBox";
import Title from "./Title";
import Spacer from "./Spacer";
import style from "../../style";
import ShippingOption from "../screens/ShippingOption";
import SText from "./SText";

export class BuyProductBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedShipping: 0
    };
  }
  setShipping(id) {
    this.setState({ selectedShipping: id });
  }
  render() {
    return !this.props.buying ? (
      <ColorButton
        hue={120}
        medium
        center
        onPress={() => {
          this.props.onPress();
        }}
      >
        <Icon name="cart" color={colors.text} size={20} /> Buy
      </ColorButton>
    ) : (
      <View>
        <StandardBox>
          <Title style={{ marginBottom: 0 }}>Ship to:</Title>
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 0,
              marginTop: style.space / 2,
              marginBottom: style.space / 2
            }}
          >
            <Switch value={true} onValueChange={v => {}} />
            <SText
              style={{ marginLeft: 8, fontSize: 12, color: colors.textMinor }}
            >
              Save this address for future orders.
            </SText>
          </View>
        </StandardBox>
        <Title
          style={{
            paddingTop: 0,
            marginTop: 0,
            paddingLeft: style.space + style.containerPadding
          }}
        >
          Select a shipping option
        </Title>
        <ShippingButton
          green={this.state.selectedShipping == 0}
          onPress={id => {
            this.setShipping(id);
          }}
          id={0}
          time={"4-5 weeks"}
          name={"Free shipping"}
          tracking={false}
          price={0}
        />
        <ShippingButton
          onPress={id => {
            this.setShipping(id);
          }}
          id={1}
          green={this.state.selectedShipping == 1}
          time={"12-24 days"}
          name={"Deluxe shipping"}
          tracking={true}
          price={150}
        />
        <ShippingButton
          onPress={id => {
            this.setShipping(id);
          }}
          id={2}
          green={this.state.selectedShipping == 2}
          time={"7-12 days"}
          name={"Super Deluxe shipping"}
          tracking={true}
          price={255}
        />
        <ColorButton
          center
          small
          hue={40}
          sat={100}
          smallFont
          onPress={() => {
            this.props.onPress();
          }}
        >
          Buy for 1 <Entypo name="ticket" color={colors.text} size={14} />
          {"\n"}
          <Text style={{ fontSize: 11 }}>
            +150 <Icon name="coin" size={11} /> shipping
          </Text>
        </ColorButton>
        <ColorButton
          center
          small
          hue={120}
          sat={100}
          smallFont
          onPress={() => {
            this.props.onPress();
          }}
        >
          Buy for 180 <Icon name="coin" size={14} />
        </ColorButton>
        <ColorButton
          center
          small
          hue={1}
          sat={0}
          smallFont
          onPress={() => {
            this.props.onPress();
          }}
        >
          <Icon name="arrow-left" size={20} />
        </ColorButton>
      </View>
    );
  }
}

export default BuyProductBox;

let ShippingButton = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress(props.id);
      }}
    >
      <StandardBox green={props.green}>
        <ShippingOption {...props} />
      </StandardBox>
    </TouchableOpacity>
  );
};
