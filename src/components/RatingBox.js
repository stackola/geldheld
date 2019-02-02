import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation,
  ActivityIndicator
} from "react-native";
import colors from "../colors";

import { Rating, AirbnbRating } from "react-native-ratings";
import Review from "./Review";
import { review } from "../lib";

export default class RatingBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "start",
      rating: 5,
      shippingTime: "",
      reviewText: ""
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  sendReview() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ status: "loading" }, () => {
      let payload = {
        rating: this.state.rating,
        text: this.state.reviewText,
        shippingTime: this.state.shippingTime,
        productId: this.props.productId
      };
      console.log(JSON.stringify(payload));
      //send post

      review(payload)
        .then(r => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          if (r.data.status == "ok") {
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
      <View
        style={{
          backgroundColor: "white",
          marginTop: 8,
          borderRadius: 4,
          padding: 8
        }}
      >
        {this.state.status == "start" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                width: 50,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              {this.props.rating || ""}
            </Text>
            <Rating
              style={{ flex: 1 }}
              startingValue={this.props.rating || 0}
              readonly={true}
            />
            <Text
              style={{
                width: 50,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              {this.props.ratingCount > 0 && this.props.ratingCount}
            </Text>
          </View>
        )}
        {this.props.hasBought &&
          !this.props.hasReviewed &&
          this.state.status == "start" && (
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({ status: "writing" });
              }}
              style={{
                height: 40,
                backgroundColor: colors.action,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Leave a review
              </Text>
            </TouchableOpacity>
          )}
        {this.state.status == "loading" && (
          <View
            style={{
              height: 80,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator />
          </View>
        )}

        {this.state.status == "done" && (
          <View style={{}}>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Thank you for your review.
            </Text>
            <Review
              {...{
                rating: this.state.rating,
                shippingTime: this.state.shippingTime,
                time: new Date(),
                text: this.state.reviewText
              }}
              noSpace={true}
            />
          </View>
        )}

        {this.state.status == "error" && (
          <View style={{}}>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Product not owned, or already reviewed.
            </Text>
          </View>
        )}
        {this.props.hasBought && this.state.status == "writing" && (
          <View>
            <Rating
              fractions={1}
              showRating
              style={{ flex: 1 }}
              startingValue={5}
              onFinishRating={r => {
                this.setState({ rating: r });
              }}
            />
            <Text>Shipping time:</Text>
            <TextInput
              value={this.state.shippingTime}
              onChangeText={t => {
                this.setState({ shippingTime: t });
              }}
              style={{ borderBottomWidth: 2, borderColor: "#ddd" }}
              placeholder={"How long did the item take to arrive?"}
            />
            <Text>Your review:</Text>
            <TextInput
              value={this.state.reviewText}
              onChangeText={t => {
                this.setState({ reviewText: t });
              }}
              style={{
                borderBottomWidth: 2,
                borderColor: "#ddd",
                textAlignVertical: "top"
              }}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity
              onPress={() => {
                this.sendReview();
              }}
              style={{
                height: 40,
                backgroundColor: colors.action,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
