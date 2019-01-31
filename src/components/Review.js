import React, { PureComponent } from "react";
import { Text, View } from "react-native";

import { Rating, AirbnbRating } from "react-native-ratings";
import { format } from "date-fns";

export default class Review extends PureComponent {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          marginBottom: 4,
          padding: 8,
          borderRadius: 4,
          marginLeft: 8,
          marginRight: 8
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
          <Text style={{ fontSize: 12 }}>
            Shipping time: {this.props.shippingTime}
          </Text>
          <Text style={{ paddingTop: 4, fontSize: 14 }}>
            Eigentlich nicht so übel, aber ging nach 2 Wochen kaputt. 5/7 Würde
            ich nochmal kaufen.
          </Text>
        </View>
      </View>
    );
  }
}
