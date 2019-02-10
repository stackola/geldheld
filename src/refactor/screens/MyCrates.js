import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";

import InfiniteList from "../components/InfiniteList";
import UserCrateLoader from "../components/UserCrateLoader";
import { getUID } from "../../lib";
import Spacer from "../components/Spacer";
import StandardBox from "../components/StandardBox";
export class MyCrates extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="My crates" showBack />
        <InfiniteList
          path={"users/" + getUID()}
          collection={"crates"}
          header={<Spacer />}
          loading={<StandardBox loading style={{ marginTop: style.space }} />}
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

export default MyCrates;
