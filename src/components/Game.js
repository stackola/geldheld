import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import colors from "../colors";
class Game extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(this.props.path);
        }}
        style={{
          height: 80,
          backgroundColor: "white",
          marginTop: 8,
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 4,
          flexDirection: "row",
          alignItems: "center",
          overflow: "hidden"
        }}
      >
        <View style={{ width: 80, height: 80, padding: 4 }}>
          <Image
            source={{ uri: this.props.image }}
            style={{ width: 72, height: 72 }}
            resizeMode={"cover"}
          />
        </View>
        <View style={{ width: 8 }} />
        <Text
          style={{ color: colors.background, fontWeight: "bold", fontSize: 18 }}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Game);
