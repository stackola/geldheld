import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ColorButton from "./ColorButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../colors";
import StandardBox from "./StandardBox";
import Title from "./Title";
import Spacer from "./Spacer";
import style from "../../style";
import ShippingOption from "../screens/ShippingOption";

export class BuyProductBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedShipping: 1
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
          <Title>Ship to:</Title>
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
          hue={110}
          sat={0}
          smallFont
          onPress={() => {
            this.props.onPress();
          }}
        >
          Close
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
