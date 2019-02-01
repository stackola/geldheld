import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import colors from "../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class ShippingOptionSelector extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 4,
          marginLeft: 8,
          marginRight: 8,
          marginBottom: 8,
          borderRadius: 4
        }}
      >
        <Text style={{color:colors.background, fontWeight:'bold', fontSize:16, marginBottom:8}}>Shipping options</Text>
        {this.props.options.map((o, index) => {
          return (
            <TouchableOpacity
            onPress={()=>{
              this.props.onChange(index);
            }}
              key={o.name}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
                padding:4,
                borderRadius:4,
                borderWidth:4,
                borderColor:this.props.selected==index?colors.action:'white',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {o.name}
                </Text>
                <Text>{o.tracking ? "Tracking available" : "No tracking"}</Text>
                <Text>{o.time}</Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {o.price} <Icon size={14} color={colors.action} name="coin" />
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
