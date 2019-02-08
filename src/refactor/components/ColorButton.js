import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../../style";
import colors from "../../colors";

export default class ColorButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pressedIn: false
    };
  }

  render() {
    let props = this.props;
    let h = props.hue || Math.random() * 255;
    let color1 = "hsla(" + h + ", 100%, 40%, 1)";
    let color2 = "hsla(" + h + ", 100%, 25%, 1)";
    return (
      <TouchableOpacity
        style={{
          height: 80,
          flex: props.noFlex || props.inLine ? 0 : 1,
          margin: style.space,
          marginTop: 0,
          marginBottom: style.space,
          overflow: "hidden",
          borderRadius: style.smallBorderRadius,
          backgroundColor: color2
        }}
      >
        <View
          style={{
            padding: style.containerPadding,
            flex: 1,
            backgroundColor: color1,
            justifyContent: "center"
          }}
        >
          {!props.loading && !props.error && !props.done && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ marginRight: style.space, marginLeft: style.space }}
              >
                {props.icon}
              </View>
              <Text
                style={{
                  marginLeft: style.space,
                  color: "white",
                  fontSize: 20,
                  color: colors.text,
                  fontWeight: "bold"
                }}
              >
                {props.text}
              </Text>
            </View>
          )}
          {props.error && <Icon name="alert" color="white" size={20} />}
          {props.done && <Icon name="check" color="white" size={20} />}
          {props.loading && <ActivityIndicator color={"white"} />}
        </View>
        <View style={{ height: style.space / 2, backgroundColor: color2 }} />
      </TouchableOpacity>
    );
  }
}