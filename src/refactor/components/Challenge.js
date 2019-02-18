import React, { Component } from "react";
import { Text, View } from "react-native";
import StandardBox from "./StandardBox";
import Title from "./Title";
import SText from "./SText";
import ProgressBar from "./ProgressBar";
import ContinousBar from "./ContinousBar";
import colors from "../../colors";
import style from "../../style";

import firebase from "react-native-firebase";
import { getUID } from "../../lib";

export default class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProgress: null
    };
  }
  componentDidMount() {
    // fetch user progress.
    firebase
      .firestore()
      .doc("users/" + getUID())
      .collection("challenges")
      .doc(this.props.id)
      .get()
      .then(userProgress => {
        console.log("got user progress", userProgress);
        if (userProgress._data) {
          this.setState({ userProgress: userProgress._data });
        }
      });
  }
  getCurrentStep() {
    let complete = this.state.userProgress
      ? this.state.userProgress.nextStep
      : 0;

    return (
      this.props.steps.filter(a => {
        return a.order == complete;
      })[0] || this.props.steps[this.props.steps.length - 1]
    );
  }
  render() {
    console.log(this.props);
    let step = this.getCurrentStep();
    let total = step.target;
    let complete = this.state.userProgress
      ? this.state.userProgress.progress
      : 0;
    let continous = this.props.continous;
    let text = step.text;
    let title = step.name;
    return (
      <StandardBox>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Title text={title} />
            <SText text={text} />
          </View>
          <View
            style={{
              minWidth: 80,
              paddingLeft: style.space / 2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                fontSize: style.containerHeadline.fontSize
              }}
            >
              {complete} / {total}
            </Text>
          </View>
        </View>
        {continous ? (
          <ContinousBar total={total} complete={complete} />
        ) : (
          <ProgressBar total={total} complete={complete} />
        )}
      </StandardBox>
    );
  }
}
