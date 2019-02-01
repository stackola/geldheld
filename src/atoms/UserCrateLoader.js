import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ItemLoader from "../components/ItemLoader";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../colors";
import { navToUserCrate } from "../lib";
let style = {
  height: 80,
  backgroundColor: "white",
  margin: 8,
  marginBottom: 0,
  borderRadius: 4
};
class UserCrateLoader extends PureComponent {
  render() {
    return (
      <ItemLoader
        realtime={true}
        path={this.props.path}
        loadingComponent={<View style={style} />}
      >
        {userCrate => {
          console.log(userCrate);
          let cratePath = "crates/" + userCrate.crateId;
          return (
            <ItemLoader
              realtime={false}
              cache={true}
              path={cratePath}
              loadingComponent={<View style={style} />}
            >
              {crate => {
                console.log("got both crates");
                return (
                  <ListElem
                    userCrate={userCrate}
                    crate={crate}
                    navigation={this.props.navigation}
                  />
                );
              }}
            </ItemLoader>
          );
        }}
      </ItemLoader>
    );
  }
}
export default withNavigation(UserCrateLoader);
class ListElem extends PureComponent {
  pressed() {
    let crate = this.props.crate;
    let userCrate = this.props.userCrate;
    this.props.navigation.navigate(navToUserCrate(userCrate.id));
  }
  render() {
    let crate = this.props.crate;
    console.log(crate);
    let userCrate = this.props.userCrate;
    return (
      <TouchableOpacity
        style={{ ...style, flexDirection: "row" }}
        onPress={() => {
          this.pressed();
        }}
      >
        <View
          style={{
            width: 80,
            borderColor: crate.color,
            borderWidth: 4,
            margin: 4,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon name="cube-outline" size={40} color={crate.color} />
        </View>
        <View style={{ flex: 1, paddingTop: 4 }}>
          <Text
            style={{
              color: colors.background,
              fontWeight: "bold",
              fontSize: 15
            }}
          >
            {crate.name}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        {userCrate.opened && (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "hsla(0,0%,0%,0.5)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                transform: [{ rotate: "15deg" }]
              }}
            >
              OPENED
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
