import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import Challenge from "../components/Challenge";
import InfiniteList from "../components/InfiniteList";
import StandardBox from "../components/StandardBox";
import firebase from "react-native-firebase";
import Spacer from "../components/Spacer";
export class Challenges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: []
    };
  }

  componentDidMount() {
    // fetch all challenges.
    this.fetchChallenges();
  }
  fetchChallenges() {
    firebase
      .firestore()
      .collection("challenges")
      .where("active", "==", true)
      .get()
      .then(snap => {
        let challenges = snap._docs.map(d => d._data);
        console.log(challenges);
        this.setState({ challenges: challenges });
      });
  }
  render() {
    return (
      <Wrapper>
        <Header title="Challenges" />
        <InfiniteList
          header={
            <View>
              <Spacer />
            </View>
          }
          loading={
            <View>
              <Spacer />
              <StandardBox loading />
            </View>
          }
          collection={"challenges"}
          orderBy={"order"}
          renderItem={i => {
            return (
              <Challenge
                {...i}
                steps={i.steps.sort((a, b) => {
                  return a.order - b.order;
                })}
              />
            );
          }}
        />
      </Wrapper>
    );
  }
}

export default Challenges;
