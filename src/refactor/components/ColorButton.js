import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";

import { withNavigation } from "react-navigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../../style";
import colors from "../../colors";

class ColorButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pressedIn: false
    };
  }
  pressed() {
    if (this.props.onPress) {
      this.props.onPress();
    }
    if (this.props.route) {
      this.props.navigation.navigate(this.props.route);
    }
  }
  render() {
    let props = this.props;
    let h = props.hue || Math.random() * 255;
    let color1 =
      "hsla(" +
      h +
      ", " +
      (this.props.sat >= 0 ? this.props.sat : 100) +
      "%, 40%, 1)";
    let color2 =
      "hsla(" +
      h +
      ", " +
      (this.props.sat >= 0 ? this.props.sat : 100) +
      "%, 25%, 1)";
    return (
      <TouchableOpacity
        onPress={() => {
          this.pressed();
        }}
        style={{
          height: props.small ? 50 : props.medium ? 62 : 75,
          flex: props.noFlex || props.inLine ? 0 : 1,
          margin: props.noMargin ? 0 : style.space,
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
            justifyContent: "center",
            alignItems: props.center ? "center" : "flex-start"
          }}
        >
          {!props.loading && !props.error && !props.done && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {!props.center && (
                <View
                  style={{ marginRight: style.space, marginLeft: style.space }}
                >
                  {props.icon}
                </View>
              )}
              <Text
                style={{
                  marginLeft: props.center ? 0 : style.space,
                  color: "white",
                  flex: 1,
                  textAlign: props.center ? "center" : "left",
                  fontSize: props.smallFont ? 14 : 20,
                  color: colors.text,
                  fontWeight: "bold"
                }}
              >
                {this.props.children || props.text || props.title}
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

export default withNavigation(ColorButton);
