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
    const crateItems = [
      { type: "coins", name: "500 coins" },
      { type: "coins", name: "1000 coins" },
      { type: "crate", name: "Fortnite crate" },
      {
        type: "product",
        name: "LED Lighter",
        image: "https://i.imgur.com/xBjQ6Ld.png"
      },
      {
        type: "product",
        name: "Fidget Spinner",
        image: "https://i.imgur.com/RUtD703.png"
      }
    ];
    return (
      <Wrapper>
        <Header title="Open crate" showBack={true} />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingLeft: 8,
              paddingTop: 8
            }}
          >
            <Crate name={"Gadget Crate"} color={colors.action} />
          </View>
          <View style={{ alignItems: "center" }}>
            <SlotMachine
              ref={ref => {
                this.slot = ref;
              }}
              height={this.state.opening ? 240 : 0}
              width={160}
              renderContent={c => <CrateSlotItem {...crateItems[c]} />}
              useNativeDriver={true}
              text={0}
              duration={8000}
              padding={1}
              styles={{
                overlay: { backgroundColor: "none" },
                slotWrapper: { backgroundColor: "none" },
                slotInner: { backgroundColor: "none" },
                innerBorder: { borderWidth: 0 },
                outerBorder: { backgroundColor: "none", borderWidth: 0 },
                text: { color: "white" }
              }}
              initialAnimation={false}
              range="012340123401234"
            />
          </View>
          <Title text="Contents:" />
          <View style={{ height: 8 }} />
          <CrateContent type={"coins"} name="500 coins" chance={"40"} />
          <CrateContent type={"crate"} name="Gadget crate" chance={"30"} />
          <CrateContent
            type={"product"}
            name="LED Lighter"
            image={"https://i.imgur.com/xBjQ6Ld.png"}
            chance={"10"}
          />
          <CrateContent
            type={"product"}
            name="Fidget Spinner"
            image={"https://i.imgur.com/RUtD703.png"}
            chance={"10"}
          />
          <CrateContent type={"coins"} name="1000 coins" chance={"10"} />
        </ScrollView>
        {!this.state.opening && (
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this.setState({ opening: true }, () => {
                this.slot.spinTo(3);
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
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Open crate!
            </Text>
          </TouchableOpacity>
        )}
      </Wrapper>
    );
  }
}
