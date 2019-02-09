import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity
} from "react-native";
import StandardBox from "../components/StandardBox";

import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import style from "../../style";
import Coins from "./Coins";
import colors from "../../colors";
import { format } from "date-fns";
import Title from "./Title";
import SText from "./SText";

export default class Voucher extends Component {
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
    let color = this.props.amount >= 0 ? colors.green : colors.red;
    let used = false;
    return this.props.loading ? (
      <StandardBox
        noPadding
        style={{
          flex: 1,
          minHeight: 60,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator color={colors.text} />
      </StandardBox>
    ) : (
      <StandardBox noPadding style={{}}>
        <TouchableOpacity
          onPress={() => {
            this.toggleOpen();
          }}
          style={{
            flex: 1,
            minHeight: 60,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              marginLeft: style.containerPadding,
              marginRight: style.containerPadding
            }}
          >
            <Entypo
              name="ticket"
              color={colors.text}
              size={30}
              style={{ width: 30 }}
            />
          </View>
          <SText>1x</SText>
          <View style={{ width: style.space / 2 }} />
          <Title style={{ flex: 1 }}> Laser Pointer</Title>
          <Image
            style={{ width: 60, height: "100%", backgroundColor: "white" }}
            resizeMode={"contain"}
            source={{ uri: "https://i.imgur.com/xBjQ6Ld.png" }}
          />
        </TouchableOpacity>
        {this.state.open && (
          <View style={{ height: 60, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.coin,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name={"coin"} color={"white"} size={25} />
              <SText style={{ fontSize: 10 }}>
                Sell for 80 <Icon name={"coin"} color={"white"} size={10} />
              </SText>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.green,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name={"arrow-right"} color={"white"} size={25} />
              <SText style={{ fontSize: 10 }}>View product</SText>
            </View>
          </View>
        )}

        {used && (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: colors.darkTransparent,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                fontSize: 30,
                transform: [{ rotate: "-10deg" }]
              }}
            >
              USED
            </Text>
          </View>
        )}
      </StandardBox>
    );
  }
}

/*


*/
