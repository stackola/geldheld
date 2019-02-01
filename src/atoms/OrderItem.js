import React, { PureComponent } from "react";
import { Text, View, Image } from "react-native";
import { format } from "date-fns";
import { withNavigation } from "react-navigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../colors";
export class OrderItem extends PureComponent {
  pressed() {}
  statusToColor(status) {
    if (status == "new") {
      return "orange";
    }
    if (status == "new") {
      return "green";
    }
  }
  statusToString(status) {
    if (status == "new") {
      return "New";
    }
    if (status == "shipped") {
      return "Shipped";
    }
  }
  render() {
    let p = this.props;
    return (
      <View
        style={{
          padding: 4,
          margin: 8,
          marginTop: 0,
          backgroundColor: "white",
          borderRadius: 4,
          overflow: "hidden"
        }}
      >
        <View
          style={{ height: 80, flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={{ uri: p.product.image }}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <Text style={{ flex: 1, fontWeight: "bold", marginLeft: 8 }}>
            {p.product.name}
          </Text>
          <Text style={{ textAlign: "center" }}>
            {format(p.time, "YYYY/MM/DD")}
            {"\n"}
            {format(p.time, "HH:mm")}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              marginLeft: 8,
              fontSize: 16,
              marginTop: 8,
              marginBottom: 8,
              color: this.statusToColor(p.status)
            }}
          >
            Status: {this.statusToString(p.status)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 4,
            borderWidth: 2,
            padding: 4,
            borderRadius: 4,
            borderColor: "#ccc"
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {p.shippingOption.name}
            </Text>
            <Text>
              {p.shippingOption.tracking ? "Tracking available" : "No tracking"}
            </Text>
            <Text>{p.shippingOption.time}</Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {p.shippingOption.price}{" "}
            <Icon size={14} color={colors.action} name="coin" />
          </Text>
        </View>
        <View style={{ marginLeft: 4 }}>
          {p.shippingOption.tracking ? (
            <Text>
              Tracking number: {p.trackingId || "available once shipped."}
            </Text>
          ) : null}
        </View>
        <View style={{ marginLeft: 4 }}>
          <Text style={{ paddingLeft: 4 }}>Shipping to:</Text>
          <Text style={{ padding: 8, paddingTop: 4 }}>{p.address}</Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(OrderItem);
