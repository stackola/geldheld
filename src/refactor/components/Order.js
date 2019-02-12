import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity
} from "react-native";
import StandardBox from "../components/StandardBox";

import ShippingOption from "../screens/ShippingOption";

import colors from "../../colors";
import style from "../../style";

import Coins from "./Coins";
import Title from "./Title";
import { format } from "date-fns";
import SText from "./SText";

import { withNavigation } from "react-navigation";
import {
  navToProduct,
  orderStatusToString,
  orderStatusToColor
} from "../../lib";

export class Order extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  toggleOpen() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ open: !this.state.open });
  }
  render() {
    if (this.props.loading) {
      return <StandardBox loading style={{ marginTop: style.space }} />;
    }
    return (
      <StandardBox style={{ paddingTop: 0 }}>
        <TouchableOpacity
          onPress={() => {
            this.toggleOpen();
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Title>Order #{(this.props.id || "").substr(0, 7)}</Title>
            <View style={{ flex: 1 }} />

            <Text
              style={{
                color: colors.textMinor,
                textAlign: "right",
                fontSize: 11
              }}
            >
              {format(this.props.time, "YYYY/MM/DD")}{" "}
              {format(this.props.time, "HH:mm")}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: style.space / 2,
              marginBottom: style.space / 2
            }}
          >
            <SText>Contains:</SText>
            <View style={{ flex: 1 }} />
            <SText>{this.props.product.name}</SText>
            {this.state.open && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(
                    navToProduct(this.props.productId)
                  );
                }}
                style={{
                  borderRadius: 2,
                  overflow: "hidden",
                  marginLeft: style.space
                }}
              >
                <Image
                  source={{ uri: this.props.product.image }}
                  style={{
                    height: 60,
                    width: 60,
                    backgroundColor: "white",
                    overflow: "hidden"
                  }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SText>Order status: </SText>
            <View style={{ flex: 1 }} />
            <SText color={orderStatusToColor(this.props.status)}>
              {orderStatusToString(this.props.status)}
            </SText>
          </View>
        </TouchableOpacity>
        {this.state.open && (
          <React.Fragment>
            {this.props.shippingOption.tracking && (
              <React.Fragment>
                <View style={{ height: 4 }} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SText>Tracking #: </SText>
                  <View style={{ flex: 1 }} />
                  {this.props.trackingId ? (
                    <SText>{this.props.trackingId}</SText>
                  ) : (
                    <SText style={{ color: colors.textMinor, fontSize: 10 }}>
                      No available yet
                    </SText>
                  )}
                </View>
              </React.Fragment>
            )}
            <View style={{ height: 4 }} />
            <ShippingOption hidePrice {...this.props.shippingOption} />
            <View style={{ height: 4 }} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SText>Total Price: </SText>
              <View style={{ flex: 1 }} />
              <Coins amount={this.props.totalPrice} />
            </View>
          </React.Fragment>
        )}
        <View style={{ height: style.space / 2 }} />
      </StandardBox>
    );
  }
}

export default withNavigation(Order);
