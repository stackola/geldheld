import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import SlotMachine from "react-native-slot-machine";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Crate from "../atoms/Crate";
import CrateSlotItem from "../atoms/CrateSlotItem";
import Title from "../atoms/Title";
import CrateContent from "../atoms/CrateContent";
import colors from "../colors";
import { getUID } from "../lib";
import ItemLoader from "../components/ItemLoader";

export default class OpenCrate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opening: false
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    let userCrateId = "5Wqauh3i8wCinEy5k32o";

    return (
      <Wrapper>
        <Header title="Your crate" showBack={true} />
        <ItemLoader
          path={"users/" + getUID() + "/crates/" + userCrateId}
          realtime={false}
        >
          {r => {
            console.log("usercrate", r);
            return (
              <ItemLoader path={"crates/" + r.crateId} realtime={false}>
                {crateObj => {
                  let crateItems = crateObj.items.sort(
                    (a, b) => a.order - b.order
                  );
                  return (
                    <React.Fragment>
                      <ScrollView style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            paddingLeft: 8,
                            paddingTop: 8
                          }}
                        >
                          <Crate name={crateObj.name} color={crateObj.color} />
                        </View>
                        <View style={{ alignItems: "center" }}>
                          <SlotMachine
                            ref={ref => {
                              this.slot = ref;
                            }}
                            height={this.state.opening ? 240 : 0}
                            width={160}
                            renderContent={c => (
                              <CrateSlotItem {...crateItems[c]} />
                            )}
                            useNativeDriver={true}
                            text={0}
                            duration={8000}
                            padding={1}
                            styles={{
                              overlay: { backgroundColor: "none" },
                              slotWrapper: { backgroundColor: "none" },
                              slotInner: { backgroundColor: "none" },
                              innerBorder: { borderWidth: 0 },
                              outerBorder: {
                                backgroundColor: "none",
                                borderWidth: 0
                              },
                              text: { color: "white" }
                            }}
                            initialAnimation={false}
                            range="012340123401234"
                          />
                        </View>
                        <Title text="Contents:" />
                        <View style={{ height: 8 }} />
                        {!!crateItems &&
                          crateItems.map(c => {
                            return <CrateContent key={c.name} {...c} />;
                          })}
                      </ScrollView>
                      {!this.state.opening && (
                        <TouchableOpacity
                          onPress={() => {
                            LayoutAnimation.configureNext(
                              LayoutAnimation.Presets.easeInEaseOut
                            );
                            this.setState({ opening: true }, () => {
                              this.slot.spinTo(4);
                            });
                          }}
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
                            Open crate!
                          </Text>
                        </TouchableOpacity>
                      )}
                    </React.Fragment>
                  );
                }}
              </ItemLoader>
            );
          }}
        </ItemLoader>
      </Wrapper>
    );
  }
}
