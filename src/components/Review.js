import React, { PureComponent } from "react";
import { Text, View } from "react-native";

import { Rating, AirbnbRating } from "react-native-ratings";
import { format } from "date-fns";

export default class Review extends PureComponent {
  render() {
    let ns = this.props.noSpace;
    return (
      <View
        style={{
          backgroundColor: "white",
          marginBottom: ns ? 0 : 4,
          padding: ns ? 0 : 8,
          borderRadius: 4,
          marginLeft: ns ? 0 : 8,
          marginRight: ns ? 0 : 8
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Rating
            readonly={true}
            startingValue={this.props.rating}
            imageSize={20}
          />
          <Text style={{ paddingLeft: 4, fontWeight: "bold" }}>
            {this.props.rating}
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "right" }}>
              {format(this.props.time, "YYYY/MM/DD")}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 4 }}>
          {!!this.props.shippingTime && (
            <Text style={{ fontSize: 12 }}>
              Shipping time: {this.props.shippingTime}
            </Text>
          )}
          {!!this.props.text && (
            <Text style={{ paddingTop: 4, fontSize: 14 }}>
              {this.props.text}
            </Text>
          )}
        </View>
      </View>
    );
  }
}
