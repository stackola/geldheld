import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  UIManager,
  ActivityIndicator,
  LayoutAnimation
} from "react-native";
import ColorButton from "./ColorButton";

import { withNavigation } from "react-navigation";

import { connect } from "react-redux";
import { ActionCreators } from "../../redux/actions";
import { bindActionCreators } from "redux";

import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../colors";
import StandardBox from "./StandardBox";
import Title from "./Title";
import Spacer from "./Spacer";
import style from "../../style";
import ShippingOption from "../screens/ShippingOption";
import SText from "./SText";
import { getVouchersForProduct, order } from "../../lib";

export class BuyProductBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedShipping: 0,
      voucher: null,
      address: "",
      saveAddress: false,
      status: "start"
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  setShipping(id) {
    this.setState({ selectedShipping: id });
  }
  getShippingPrice() {
    return this.props.shippingOptions[this.state.selectedShipping].price;
  }
  getTotalPrice() {
    return this.getShippingPrice() + this.props.price;
  }
  buy(withVoucher) {
    let payload = {
      useVoucher: withVoucher,
      address: this.state.address,
      saveAddress: this.state.saveAddress,
      shippingOption: this.state.selectedShipping,
      productId: this.props.id,
      voucherId: this.state.voucher ? this.state.voucher.id : null
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ status: "loading" }, () => {
      order(payload).then(r => {
        console.log("got order responsem", r);

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (r.data.status == "ok") {
          //order successful
          this.setState({
            status: "done"
          });
        } else {
          // something went wrong.
          this.setState({
            status: "error"
          });
        }
      });
    });
  }
  componentDidMount() {
    let pid = this.props.id;
    getVouchersForProduct(pid).then(v => {
      console.log("vouchers", v);
      if (v && v.length > 0) {
        this.setState({ voucher: v[0] });
      }
    });
    if (this.props.user.address) {
      this.setState({ address: this.props.user.address, saveAddress: true });
    }
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
    ) : this.state.status == "start" ? (
      <View>
        <StandardBox>
          <Title style={{ marginBottom: 0 }}>Ship to:</Title>
          <TextInput
            placeholder={"Name\nAddress\nCity & ZIP code\nState & Country"}
            placeholderTextColor={colors.textMinor}
            value={this.state.address}
            onChangeText={t => {
              this.setState({ address: t });
            }}
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
            <Switch
              value={this.state.saveAddress}
              onValueChange={v => {
                this.setState({ saveAddress: v });
              }}
            />
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
        {this.props.shippingOptions.map((s, index) => {
          return (
            <ShippingButton
              key={index}
              green={this.state.selectedShipping == index}
              onPress={() => {
                this.setShipping(index);
              }}
              id={index}
              {...s}
            />
          );
        })}
        {this.state.voucher && (
          <ColorButton
            center
            small
            hue={40}
            sat={100}
            smallFont
            onPress={() => {
              this.buy(true);
            }}
          >
            Buy for 1 <Entypo name="ticket" color={colors.text} size={14} />
            {this.getShippingPrice() > 0 && (
              <Text style={{ fontSize: 11 }}>
                {"\n"}+{this.getShippingPrice()} <Icon name="coin" size={11} />{" "}
                shipping
              </Text>
            )}
          </ColorButton>
        )}
        {!this.state.voucher && (
          <ColorButton
            center
            small
            hue={120}
            sat={100}
            smallFont
            onPress={() => {
              this.buy(false);
            }}
          >
            Buy for {this.getTotalPrice()} <Icon name="coin" size={14} />
          </ColorButton>
        )}
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
    ) : this.state.status == "loading" ? (
      <StandardBox loading />
    ) : this.state.status == "error" ? (
      <StandardBox red>
        <Title>Error</Title>
        <SText>
          Something went wrong. Make sure you have enoug coins, and the voucher
          you are using is sitll valid.
        </SText>

        <Spacer size={4} />
        <ColorButton
          hue={198}
          sat={0}
          noMargin
          small
          center
          onPress={() => {
            this.setState({ status: "start" });
          }}
          style={{ marginBottom: style.space / 2 }}
        >
          Try again
        </ColorButton>
      </StandardBox>
    ) : this.state.status == "done" ? (
      <StandardBox green>
        <Title>Order successful</Title>
        <SText>
          Thank you for your order. If you selected shipping with a tracking
          option, please check back in a few days for details.
        </SText>
        <Spacer size={4} />
        <ColorButton
          hue={198}
          noMargin
          small
          center
          onPress={() => {
            this.props.navigation.navigate("MyOrders");
          }}
          style={{ marginBottom: style.space / 2 }}
        >
          <Icon name="truck-fast" color={colors.text} size={40} size={20} /> My
          orders
        </ColorButton>
      </StandardBox>
    ) : (
      <StandardBox>
        <SText>How did you get here</SText>
      </StandardBox>
    );
  }
}

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

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(BuyProductBox));
