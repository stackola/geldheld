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
import { getUID, openCrate } from "../lib";
import ItemLoader from "../components/ItemLoader";

export default class OpenCrate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opening: false,
      slotItem: 0,
      status: "start"
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  open() {
    let userCrateId = this.props.navigation.getParam("id", null);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ opening: true }, () => {
      openCrate(userCrateId)
        .then(resp => {
          console.log(resp);
          if (resp.data.status == "ok") {
            this.setState({
              droppedItem: resp.data.data,
              status: "finished",
              slotItem: resp.data.data.item.order
            });
            this.slot.spinTo(resp.data.data.item.order);
          }
        })
        .catch(err => {
          this.setState({ status: "error" });
        });
    });
  }
  render() {
    let userCrateId = this.props.navigation.getParam("id", null);

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
                            text={this.state.slotItem}
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
                            this.open();
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
