import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  ActivityIndicator,
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
import { getUID, openCrate, buyCrate, quickSell } from "../lib";
import ItemLoader from "../components/ItemLoader";

export default class OpenCrate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opening: false,
      buyCrateLoading: false,
      buyCrateError: false,
      itemSold: false,
      sellItemLoading: false,
      sellItemError: false,
      slotItem: 0,
      status: "start",
      openCrateLoading: false
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  doSell(id) {
    if (this.state.sellItemLoading || this.state.itemSold) {
      return;
    }
    this.setState({ sellItemError: false, sellItemLoading: true }, () => {
      quickSell(id)
        .then(r => {
          console.log(r);
          if (r.data.status !== "ok") {
            throw "error";
          }

          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({
            sellItemError: false,
            sellItemLoading: false,
            itemSold: true
          });
          console.log(r);
        })
        .catch(e => {
          this.setState({ sellItemError: true, sellItemLoading: false });
          console.log("error!");
        });
    });
  }
  buyCrateAgain(id) {
    this.setState({ buyCrateLoading: true, buyCrateError: false }, () => {
      buyCrate(id).then(r => {
        console.log(r);
        if (r.data.status == "ok") {
          return this.props.navigation.replace({
            routeName: "SettingsMyCrate",
            params: { id: r.data.userCrate },
            newKey: r.data.userCrate
          });
        } else {
          this.setState(
            { buyCrateError: true, buyCrateLoading: false },
            () => {}
          );
        }
      });
    });
  }
  open() {
    this.setState({ openCrateLoading: true }, () => {
      let userCrateId = this.props.navigation.getParam("id", null);
      openCrate(userCrateId)
        .then(resp => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({ opening: true, openCrateLoading: false }, () => {
            console.log(resp);
            if (resp.data.status == "ok") {
              setTimeout(() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({
                  droppedItem: resp.data.data,
                  status: "finished",
                  openCrateLoading: false,
                  slotItem: resp.data.data.item.order
                });
              }, 8000);
              this.slot.spinTo(resp.data.data.item.order);
            }
          });
        })
        .catch(err => {
          this.setState({ status: "error", openCrateLoading: false });
        });
    });
  }
  render() {
    let userCrateId = this.props.navigation.getParam("id", null);

    return (
      <Wrapper>
        <Header
          title="Your crate"
          showBack={true}
          hideBalance={
            (this.state.opening && this.state.status != "finished") ||
            this.state.openCrateLoading
          }
        />
        <ItemLoader
          path={"users/" + getUID() + "/crates/" + userCrateId}
          realtime={false}
        >
          {r => {
            console.log("usercrate", r);
            return (
              <ItemLoader
                path={"crates/" + r.crateId}
                cache={true}
                realtime={false}
              >
                {crateObj => {
                  let crateItems = crateObj.items.sort(
                    (a, b) => a.order - b.order
                  );
                  let buyAgain = (
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.action,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 4,
                        flex: 1
                      }}
                      onPress={() => this.buyCrateAgain(crateObj.id)}
                    >
                      {this.state.buyCrateLoading == false &&
                        this.state.buyCrateError == false && (
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            Buy same crate again!
                          </Text>
                        )}
                      {this.state.buyCrateLoading && <ActivityIndicator />}
                      {this.state.buyCrateError && (
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          Error!
                        </Text>
                      )}
                    </TouchableOpacity>
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
                            height={
                              this.state.opening
                                ? this.state.itemSold
                                  ? 0
                                  : 240
                                : 0
                            }
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
                        {this.state.status == "finished" &&
                          this.state.droppedItem.item.type == "coins" && (
                            <View style={{ marginLeft: 8, marginRight: 8 }}>
                              <Text
                                style={{
                                  color: "white",
                                  textAlign: "center",
                                  marginBottom: 8
                                }}
                              >
                                Congratulations! You won{" "}
                                {this.state.droppedItem.item.value} coins!
                              </Text>
                              {buyAgain}
                            </View>
                          )}
                        {r.opened && (
                          <View style={{ alignItems: "center" }}>
                            <Text
                              style={{
                                color: "white",
                                marginBottom: 8,
                                fontSize: 18
                              }}
                            >
                              This crate contained:
                            </Text>
                            <CrateSlotItem {...r.content} />
                          </View>
                        )}
                        {this.state.status == "finished" &&
                          this.state.droppedItem.item.type == "crate" && (
                            <View style={{}}>
                              <Text
                                style={{
                                  color: "white",
                                  textAlign: "center",
                                  marginBottom: 8
                                }}
                              >
                                Congratulations!{"\n"}You won a{" "}
                                {this.state.droppedItem.item.name}!
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: 8,
                                  marginRight: 8
                                }}
                              >
                                {buyAgain}
                                <View style={{ width: 8 }} />
                                <TouchableOpacity
                                  onPress={() => {
                                    this.props.navigation.replace({
                                      routeName: "SettingsMyCrate",
                                      params: {
                                        id: this.state.droppedItem.newCrateId
                                      },
                                      newKey: this.state.droppedItem.newCrateId
                                    });
                                  }}
                                  style={{
                                    flex: 1,
                                    backgroundColor: colors.action,
                                    borderRadius: 4,
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "white",
                                      fontWeight: "bold"
                                    }}
                                  >
                                    View crate
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        {this.state.status == "finished" &&
                          this.state.droppedItem.item.type == "product" && (
                            <View style={{ alignItems: "center" }}>
                              {!this.state.itemSold && (
                                <Text
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                    marginBottom: 8
                                  }}
                                >
                                  Congratulations!{"\n"}Your price:{" "}
                                  {this.state.droppedItem.item.name}!
                                </Text>
                              )}

                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: 8,
                                  marginRight: 8
                                }}
                              >
                                {buyAgain}
                                <View style={{ width: 8 }} />
                                <TouchableOpacity
                                  onPress={() => {
                                    this.doSell(
                                      this.state.droppedItem.voucherId
                                    );
                                  }}
                                  style={{
                                    backgroundColor: colors.action,
                                    height: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 180,
                                    borderRadius: 4
                                  }}
                                >
                                  {!this.state.sellItemLoading &&
                                    !this.state.itemSold && (
                                      <Text
                                        style={{
                                          color: "white",
                                          fontWeight: "bold"
                                        }}
                                      >
                                        Quick sell for{" "}
                                        {
                                          this.state.droppedItem.item
                                            .resellValue
                                        }{" "}
                                        <Icon name="coin" />
                                      </Text>
                                    )}
                                  {this.state.itemSold && (
                                    <Text
                                      style={{
                                        color: "white",
                                        fontWeight: "bold"
                                      }}
                                    >
                                      Sold!
                                    </Text>
                                  )}
                                  {this.state.sellItemError && (
                                    <Text
                                      style={{
                                        color: "white",
                                        fontWeight: "bold"
                                      }}
                                    >
                                      Error
                                    </Text>
                                  )}
                                  {this.state.sellItemLoading && (
                                    <ActivityIndicator />
                                  )}
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        <Title text="Possible prizes:" />
                        <View style={{ height: 8 }} />
                        {!!crateItems &&
                          crateItems.map(c => {
                            return <CrateContent key={c.name} {...c} />;
                          })}
                      </ScrollView>
                      {!this.state.opening && !r.opened && (
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
                          {!this.state.openCrateLoading && (
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Open crate!
                            </Text>
                          )}
                          {this.state.openCrateLoading && <ActivityIndicator />}
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
