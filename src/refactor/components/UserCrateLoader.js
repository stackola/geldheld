import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ItemLoader from "./ItemLoader";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import { navToUserCrate } from "../../lib";
import StandardBox from "./StandardBox";
import CrateButton from "./CrateButton";
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
                  <StandardBox
                    noPadding
                    style={{ height: 80, flexDirection: "row" }}
                  >
                    <View style={{ width: 90 }}>
                      <CrateButton
                        {...crate}
                        noMargin
                        hidePrice
                        smallIcon
                        hideText
                        noLink
                      />
                    </View>
                    <Spacer horizontal />
                    <View style={{ flex: 1 }}>
                      <Title>{crate.name}</Title>
                    </View>
                    <View style={{}}>
                      <CrateItem
                        width={100}
                        {...crate.items[2]}
                        hideChance
                        style={{ marginBottom: 0, height: 80 }}
                      />
                    </View>
                  </StandardBox>
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
