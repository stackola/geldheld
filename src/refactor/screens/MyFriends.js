import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Friend from "../components/Friend";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import InfiniteList from "../components/InfiniteList";
import { getUID } from "../../lib";

export class MyFriends extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Friends" showBack />
        <InfiniteList
          header={<View style={{ height: style.space }} />}
          loading={<Friend loading />}
          path={"users/" + getUID()}
          collection={"friends"}
          orderBy={"time"}
          renderItem={i => {
            return <Friend {...i} />;
          }}
        />
      </Wrapper>
    );
  }
}

export default MyFriends;
