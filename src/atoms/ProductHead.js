import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default class ProductHead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: null
    };
  }

  render() {
    return (
      <View
        style={{ backgroundColor: "white", borderRadius: 4, paddingTop: 8 }}
      >
        <Image
          source={{ uri: this.state.selectedImage || this.props.image }}
          style={{ height: 220, padding: 4 }}
          resizeMode={"contain"}
        />
        <ScrollView
          horizontal={true}
          style={{ paddingLeft: 8, paddingRight: 8 }}
        >
          {this.props.images.map((i, index) => {
            return (
              <Image
                resizeMode={"contain"}
                key={index}
                source={{ uri: i }}
                style={{ height: 80, width: 80, marginRight: 8 }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
