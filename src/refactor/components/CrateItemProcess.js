import React, { Component } from "react";
import { Text, View } from "react-native";
import ColorButton from "./ColorButton";
import BuyCrateBox from "./BuyCrateBox";

import { withNavigation } from "react-navigation";

import colors from "../../colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navToUserCrate, navToProduct, quickSell } from "../../lib";

export class CrateItemProcess extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "start" };
  }
  sell(id) {
    this.setState({ status: "loading" }, () => {
      quickSell(id)
        .then(r => {
          console.log(r);
          if (r.data.status == "ok") {
            this.setState({ status: "done" });
          } else {
            this.setState({ status: "error" });
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({ status: "error" });
        });
    });
  }
  render() {
    console.log(this.props.droppedItem);
    return (
      <React.Fragment>
        {this.props.droppedItem.item.type == "product" && (
          <React.Fragment>
            <ColorButton
              small
              loading={this.state.status == "loading"}
              done={this.state.status == "done"}
              error={this.state.status == "error"}
              center
              hue={40}
              onPress={() => {
                this.sell(this.props.droppedItem.voucherId);
              }}
            >
              Quick sell for {this.props.droppedItem.item.resellValue}{" "}
              <Icon name="coin" size={20} color={colors.text} />
            </ColorButton>
            <ColorButton
              small
              center
              hue={220}
              onPress={() => {
                this.props.navigation.navigate(
                  navToProduct(this.props.droppedItem.item.productId)
                );
              }}
            >
              View in store
            </ColorButton>
          </React.Fragment>
        )}
        {this.props.droppedItem.item.type == "crate" && (
          <ColorButton
            small
            center
            hue={40}
            onPress={() => {
              this.props.navigation.navigate(
                navToUserCrate(this.props.droppedItem.newCrateId)
              );
            }}
          >
            View crate
          </ColorButton>
        )}
        <BuyCrateBox {...this.props} text={"Buy same crate again"} />
      </React.Fragment>
    );
  }
}

export default withNavigation(CrateItemProcess);
