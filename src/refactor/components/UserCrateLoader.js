import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ItemLoader from "./ItemLoader";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import { navToUserCrate } from "../../lib";
import StandardBox from "./StandardBox";
import CrateButton from "./CrateButton";
import ColorButton from "./ColorButton";
import CrateItem from "./CrateItem";
import Title from "./Title";
import Spacer from "./Spacer";
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
        loadingComponent={<StandardBox loading />}
      >
        {userCrate => {
          console.log(userCrate);
          let opened = userCrate.opened;
          let cratePath = "crates/" + userCrate.crateId;
          return (
            <ItemLoader
              realtime={false}
              cache={true}
              path={cratePath}
              loadingComponent={<StandardBox loading />}
            >
              {crate => {
                console.log("got both crates");

                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(
                        navToUserCrate(userCrate.id)
                      );
                    }}
                  >
                    <StandardBox
                      noPadding
                      style={{ height: 80, flexDirection: "row" }}
                    >
                      <View style={{ width: 90 }}>
                        <CrateButton
                          {...crate}
                          noMargin
                          sat={opened ? 0 : -1}
                          hidePrice
                          smallIcon
                          hideText
                          noLink
                        />
                      </View>
                      <Spacer horizontal />
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Title>{crate.name}</Title>
                      </View>

                      {opened && (
                        <View style={{}}>
                          <CrateItem
                            width={100}
                            {...userCrate.content}
                            hideChance
                            style={{ marginBottom: 0, height: 80 }}
                          />
                        </View>
                      )}
                    </StandardBox>
                  </TouchableOpacity>
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
