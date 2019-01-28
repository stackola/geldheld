import React, { Component } from "react";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Title from "../atoms/Title";
import Crate from "../atoms/Crate";
import firebase from "react-native-firebase";
import { getUID } from "../lib";
import ItemLoader from "../components/ItemLoader";
import Button from "../atoms/Button";
export default class Crates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crates: [],
      loading: true
    };
  }
  fetchCrates() {
    firebase
      .firestore()
      .collection("crates")
      .get()
      .then(r => {
        console.log("got res", r);
        this.setState(
          {
            loading: false,
            refreshing: false,
            crates: r._docs.map(d => d._data)
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }
  componentDidMount() {
    this.fetchCrates();
  }
  refresh() {
    this.setState({ refreshing: true }, () => {
      this.fetchCrates();
    });
  }

  render() {
    return (
      <Wrapper>
        <Header title="Crates" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.fetchCrates();
              }}
            />
          }
        >
          <Button title="My Crates" path={"MyCrates"} />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingLeft: 8,
              paddingTop: 8
            }}
          >
            {this.state.crates.map(c => {
              return <Crate key={c.id} linkToSelf={true} {...c} />;
            })}
          </View>
        </ScrollView>
      </Wrapper>
    );
  }
}
