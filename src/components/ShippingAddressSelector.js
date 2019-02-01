import React, { Component } from "react";
import { Text, View, TextInput, Switch } from "react-native";

export default class ShippingAddressSelector extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          margin: 8,
          marginTop: 0,
          borderRadius: 4,
          padding: 4
        }}
      >
        <Text style={{ margin: 4 }}>Your full address:</Text>
        <TextInput
          placeholder={"Name\nAddress\nCity & ZIP code\nState & Country"}
          onChangeText={t => {
            this.props.setAddress(t);
          }}
          style={{
            textAlignVertical: "top",
            margin: 4,
            marginTop: 0,
            borderBottomWidth: 2,
            borderColor: "#ddd"
          }}
          multiline={true}
          numberOfLines={5}
          value={this.props.address}
        />
        <View style={{ flexDirection: "row", alignItems: "center", margin: 4 }}>
          <Switch
            value={this.props.saveAddress}
            onValueChange={v => {
              console.log(v);
              this.props.setSave(v);
            }}
          />
          <Text style={{ marginLeft: 8 }}>
            Save this address for future orders.
          </Text>
        </View>
      </View>
    );
  }
}
