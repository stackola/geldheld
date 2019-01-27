import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Crate from "../atoms/Crate";
import Title from "../atoms/Title";
import CrateContent from "../atoms/CrateContent";
import colors from "../colors";
import ItemLoader from "../components/ItemLoader";
import { buyCrate } from "../lib";

import { withNavigation } from "react-navigation";
class CratePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "start"
    };
  }

  buy() {
    let crateId = "Kqj3VndmeVfYmfb8tNXl";
    this.setState({ status: "loading" }, () => {
      buyCrate(crateId).then(r => {
        console.log(r);
        if (r.data.status == "ok") {
          return this.props.navigation.replace({
            routeName: "MyCrate",
            params: { id: r.data.userCrate }
          });
        } else {
          this.setState({ status: "error" }, () => {});
        }
      });
    });
  }
  render() {
    let crateId = "Kqj3VndmeVfYmfb8tNXl";
    return (
      <Wrapper>
        <ItemLoader
          path={"crates/" + crateId}
          realtime={false}
          loadingComponent={
            <React.Fragment>
              <Header title={"Buy crate"} showBack={true} />
              <View style={{ height: 8 }} />
              <ActivityIndicator />
            </React.Fragment>
          }
        >
          {crate => {
            return (
              <React.Fragment>
                <Header title="Buy crate" showBack={true} />
                <ScrollView style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      paddingLeft: 8,
                      paddingTop: 8
                    }}
                  >
                    <Crate name={crate.name} color={crate.color} />
                  </View>
                  <Title text="Contents:" />
                  <View style={{ height: 8 }} />
                  {!!crate.items &&
                    crate.items
                      .sort((a, b) => {
                        return b.chance - a.chance;
                      })
                      .map(c => {
                        return <CrateContent key={c.name} {...c} />;
                      })}
                </ScrollView>
                {this.state.status == "start" && (
                  <TouchableOpacity
                    onPress={() => this.buy()}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 60,
                      backgroundColor: colors.action,
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15
                      }}
                    >
                      Buy crate for {crate.price} <Icon name="coin" size={15} />
                    </Text>
                  </TouchableOpacity>
                )}
                {this.state.status == "loading" && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 60,
                      backgroundColor: colors.action,
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8
                    }}
                  >
                    <ActivityIndicator />
                  </View>
                )}
                {this.state.status == "error" && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 60,
                      backgroundColor: colors.action,
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15
                      }}
                    >
                      Error. Not enough coins?
                    </Text>
                  </View>
                )}
                {this.state.status == "finished" && (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 60,
                      backgroundColor: colors.action,
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15
                      }}
                    >
                      Purchase complete!
                    </Text>
                  </View>
                )}
              </React.Fragment>
            );
          }}
        </ItemLoader>
      </Wrapper>
    );
  }
}

export default withNavigation(CratePage);
