import React, { PureComponent } from "react";
import { Text, View, Image } from "react-native";
import colors from "../colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../style";
export default class Offer extends PureComponent {
  render() {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: "white",
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 4,
          elevation: 1,
          overflow: "hidden",
          marginTop: 8,
          flexDirection: "row"
        }}
      >
        <Image
          source={{ uri: this.props.data.image }}
          style={{ width: 80 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, paddingLeft: 8 }}>
          <Text
            style={style.containerHeadline}
          >
            {this.props.data.title}
          </Text>
          <Text>{this.props.data.text}</Text>
        </View>
        <View
          style={{ width: 60, alignItems: "center", justifyContent: "center" }}
        >
          <Icon name="coin" size={25} color={colors.action} />
          <Text>{this.props.data.coins}</Text>
        </View>
      </View>
    );
  }
}
