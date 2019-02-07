import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import StandardBox from "./StandardBox";
import Title from "./Title";
import SText from "./SText";
import ProgressBar from "./ProgressBar";
import colors from "../../../colors";
import ContinousBar from "./ContinousBar";
import style from "../../../style";

export default class Challenge extends PureComponent {
  render() {
    let total = this.props.total;
    let complete = this.props.complete;
    let continous = this.props.continous;
    let text = this.props.text;
    let title = this.props.title;
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
