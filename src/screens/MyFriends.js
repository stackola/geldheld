import React, { Component } from "react";
import {
  Text,
  View,
  ToastAndroid,
  Clipboard,
  TouchableOpacity
} from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import InfiniteList from "../components/InfiniteList";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { getUID, getInviteLink } from "../lib";

import { format } from "date-fns";
import colors from "../colors";
export default class MyFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "loading..."
    };
  }
  componentDidMount() {
    getInviteLink().then(url => {
      this.setState({ url: url });
    });
  }
  copyToClip() {
    if (this.state.url != "loading...") {
      Clipboard.setString(this.state.url);
      ToastAndroid.showWithGravity(
        "Copied to clip board",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }
  }
  render() {
    return (
      <Wrapper>
        <Header title="Friends" showBack={true} />
        <InfiniteList
          header={
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.copyToClip();
                }}
                style={{
                  margin: 8,
                  backgroundColor: "white",
                  borderRadius: 4,
                  padding: 8
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Invite Link
                </Text>
                <Text
                  selectable
                  selectTextOnFocus={true}
                  style={{
                    margin: 4,
                    marginTop: 0,
                    borderBottomWidth: 2,
                    borderColor: "#ddd"
                  }}
                >
                  {this.state.url}
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "white", marginLeft: 8, marginBottom: 8 }}>
                Your friends:
              </Text>
            </View>
          }
          path={"users/" + getUID()}
          collection={"friends"}
          orderBy={"time"}
          renderItem={i => {
            return (
              <View
                style={{
                  backgroundColor: "white",
                  margin: 8,
                  padding: 8,
                  marginTop: 0,
                  alignItems: "center",
                  borderRadius: 4,
                  flexDirection: "row"
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  {format(i.time, "YYYY/MM/DD")}
                  {"\n"}
                  {format(i.time, "HH:mm")}
                </Text>
                <View style={{ flex: 1 }} />
                <Text>
                  Your share:{" "}
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    150 <Icon name="coin" color={colors.action} size={16} />
                  </Text>
                </Text>
              </View>
            );
          }}
        />
      </Wrapper>
    );
  }
}
