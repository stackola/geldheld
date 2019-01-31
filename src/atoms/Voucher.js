import React, { PureComponent } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import colors from "../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { quickSell } from "../lib";

import { navToProduct } from "../lib";
import { withNavigation } from "react-navigation";

export class Voucher extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sellItemState: "start"
    };
  }
  sell() {
    let id = this.props.id;
    this.setState({ sellItemState: "loading" }, () => {
      quickSell(id)
        .then(r => {
          console.log(r);
          if (r.data.status == "ok") {
            this.setState({ sellItemState: "done" });
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
  isInteractive() {
    return (
      this.state.sellItemState != "done" && !this.props.sold && !this.props.used
    );
  }
  render() {
    console.log(this.props);
    let item = this.props.item;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          overflow: "hidden",
          marginTop: 8,
          marginLeft: 8,
          marginRight: 8,
          height: 70,
          borderRadius: 4
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ height: 62, width: 62, margin: 4 }}
          resizeMode={"contain"}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        </View>
        {this.isInteractive() && (
          <React.Fragment>
            <TouchableOpacity
              onPress={() => {
                this.sell();
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                backgroundColor: colors.action
              }}
            >
              {this.state.sellItemState == "start" && (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  Sell for{"\n"}80 <Icon name="coin" size={14} />
                </Text>
              )}
              {this.state.sellItemState == "loading" && <ActivityIndicator />}
              {this.state.sellItemState == "done" && (
                <Icon name={"check"} size={30} color="white" />
              )}
              {this.state.sellItemState == "error" && (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  Error
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(
                  navToProduct(this.props.item.productId)
                );
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                backgroundColor: "green"
              }}
            >
              <Text>
                <Icon name={"arrow-right-bold"} size={30} color="white" />
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
        {(this.state.sellItemState == "done" || this.props.sold == true) && (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "hsla(0,0%,0%,0.5)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                transform: [{ rotate: "15deg" }]
              }}
            >
              SOLD
            </Text>
          </View>
        )}
        {this.props.used == true && (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "hsla(0,0%,0%,0.5)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                transform: [{ rotate: "15deg" }]
              }}
            >
              USED
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default withNavigation(Voucher);
