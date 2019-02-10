import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import StandardBox from "../components/StandardBox";

import { withNavigation } from "react-navigation";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import style from "../../style";
import Coins from "./Coins";
import colors from "../../colors";
import { format } from "date-fns";
import Title from "./Title";
import ColorButton from "./ColorButton";
import Spacer from "./Spacer";
import SText from "./SText";
import { navToProduct, quickSell } from "../../lib";

export class Voucher extends Component {
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
  sell() {
    let id = this.props.id;
    this.setState({ sellItemState: "loading" }, () => {
      quickSell(id)
        .then(r => {
          console.log(r);
          if (r.data.status == "ok") {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({ sellItemState: "done", open: false });
          } else {
            this.setState({ sellItemState: "error" });
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({ sellItemState: "error" });
        });
    });
  }
  render() {
    let props = this.props;
    let used = props.used;
    let sold = props.sold || this.state.sellItemState == "done";

    return this.props.loading ? (
      <StandardBox
        loading
        loadingHeight={60}
        style={{ marginTop: style.space }}
      />
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
          <Title style={{ flex: 1 }}> {props.item.name}</Title>
          <Image
            style={{ width: 60, height: "100%", backgroundColor: "white" }}
            resizeMode={"contain"}
            source={{ uri: props.item.image }}
          />
        </TouchableOpacity>
        {this.state.open && (
          <View style={{ flexDirection: "row", marginTop: style.space / 2 }}>
            <ColorButton
              loading={this.state.sellItemState == "loading"}
              done={this.state.sellItemState == "done"}
              error={this.state.sellItemState == "error"}
              noMargin
              smallFont
              center
              style={{ marginBottom: 0 }}
              hue={40}
              medium
              onPress={() => {
                this.sell();
              }}
            >
              Sell for {props.price} <Icon name="coin" size={14} />
            </ColorButton>
            <Spacer horizontal size={style.space / 2} />
            <ColorButton
              onPress={() => {
                this.props.navigation.navigate(
                  navToProduct(props.item.productId)
                );
              }}
              smallFont
              center
              noMargin
              style={{ marginBottom: 0 }}
              hue={240}
              medium
            >
              View in shop
            </ColorButton>
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

        {sold && (
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
              SOLD
            </Text>
          </View>
        )}
      </StandardBox>
    );
  }
}

/*


*/

export default withNavigation(Voucher);
