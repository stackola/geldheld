import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import CollectionLoader from "../components/CollectionLoader";
import StandardBox from "../components/StandardBox";

export class Crates extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Crates" />
        <CollectionLoader
          header={<Spacer />}
          collection={"crates"}
          loading={
            <StandardBox
              loading
              loadingHeight={100 + style.space}
              style={{ marginTop: style.space }}
            />
          }
          renderItem={i => {
            console.log(i);
            return <CrateButton {...i.item} />;
          }}
        />
      </Wrapper>
    );
  }
}

export default Crates;
