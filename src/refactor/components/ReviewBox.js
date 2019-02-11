import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import ColorButton from "./ColorButton";
import StandardBox from "./StandardBox";
import style from "../../style";
import colors from "../../colors";

import StarRating from "react-native-star-rating";
import Spacer from "./Spacer";
import { review } from "../../lib";
export default class ReviewBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "start",
      rating: 5,
      text: "",
      shippingTime: ""
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  sendReview() {
    if (this.state.status != "writing") {
      return;
    }

    this.setState({ status: "loading" }, () => {
      let payload = {
        rating: this.state.rating,
        text: this.state.text,
        shippingTime: this.state.shippingTime,
        productId: this.props.productId
      };
      //send post

      review(payload)
        .then(r => {
          console.log(r);
          if (r.data.status == "ok") {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({ status: "done" });
          } else {
            this.setState({ status: "error" });
          }
        })
        .catch(() => {
          this.setState({ status: "error" });
        });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.status != "start" && (
          <StandardBox>
            {this.state.status != "done" && (
              <React.Fragment>
                <Spacer />
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: style.space }} />
                  <View style={{ flex: 1 }}>
                    <StarRating
                      emptyStarColor={colors.textMinor}
                      fullStarColor={colors.star}
                      selectedStar={s => {
                        this.setState({ rating: s });
                      }}
                      starSize={25}
                      onChange={() => {}}
                      rating={this.state.rating}
                    />
                  </View>
                  <View style={{ width: style.space }} />
                </View>
                <Spacer />
                <TextInput
                  value={this.state.shippingTime}
                  onChangeText={t => {
                    this.setState({ shippingTime: t });
                  }}
                  placeholder={"How long did shipping take?"}
                  placeholderTextColor={colors.textMinor}
                  style={{
                    color: colors.text,
                    borderBottomWidth: 2,
                    borderColor: colors.textMinor
                  }}
                />
                <Spacer />
                <TextInput
                  value={this.state.text}
                  onChangeText={t => {
                    this.setState({ text: t });
                  }}
                  placeholder={"Your review"}
                  placeholderTextColor={colors.textMinor}
                  style={{
                    color: colors.text,
                    textAlignVertical: "top",
                    borderBottomWidth: 2,
                    borderColor: colors.textMinor
                  }}
                  multiline={true}
                  numberOfLines={4}
                />
              </React.Fragment>
            )}
            <Spacer size={4} />
            <ColorButton
              onPress={() => {
                this.sendReview();
              }}
              loading={this.state.status == "loading"}
              error={this.state.status == "error"}
              done={this.state.status == "done"}
              small
              hue={120}
              center
              noMargin
              style={{ marginBottom: style.space / 2 }}
            >
              Send
            </ColorButton>
          </StandardBox>
        )}
        {this.state.status == "start" &&
          (!this.props.hasReviewed && this.props.hasBought ? (
            <ColorButton
              center
              hue={220}
              small
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({ status: "writing" });
              }}
            >
              Leave a review
            </ColorButton>
          ) : null)}
      </React.Fragment>
    );
  }
}
