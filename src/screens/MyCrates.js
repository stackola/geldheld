import React, { Component } from "react";
import { Text, View } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import InfiniteList from "../components/InfiniteList";

import { getUID } from "../lib";
import UserCrateLoader from "../atoms/UserCrateLoader";
export default class Settings extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My Crates" showBack={true} />
        <InfiniteList
          path={"users/" + getUID()}
          collection={"crates"}
          orderBy={"time"}
          renderItem={i => {
            return (
              <UserCrateLoader path={"users/" + getUID() + "/crates/" + i.id} />
            );
          }}
        />
      </Wrapper>
    );
  }
}
