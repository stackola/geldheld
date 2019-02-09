import React, { Component } from "react";
import { View } from "react-native";
import style from "../../style";
import CrateItem from "./CrateItem";

export default class CrateContent extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 1,
          justifyContent: "space-between",
          marginRight: style.space,
          marginLeft: style.space
        }}
      >
        <CrateItem type={"coins"} amount={200} rarity={0} chance={5} />
        <CrateItem type={"coins"} amount={400} rarity={0} chance={20} />
        <CrateItem type={"coins"} amount={600} rarity={0} chance={10} />

        <CrateItem type={"coins"} amount={800} rarity={1} chance={10} />
        <CrateItem
          type={"crate"}
          rarity={1}
          chance={10}
          hue={118}
          name="Fashion crate"
        />
        <CrateItem
          type={"crate"}
          rarity={1}
          chance={10}
          hue={199}
          name="Tiny crate"
        />

        <CrateItem
          type={"product"}
          rarity={2}
          chance={5}
          image={"https://i.imgur.com/XQgg6mA.png"}
          name="Laser pointer"
        />

        <CrateItem
          type={"product"}
          rarity={2}
          chance={5}
          image={"https://i.imgur.com/xBjQ6Ld.png"}
          name="BIC Lighter"
        />
        <CrateItem type={"coins"} amount={1600} rarity={2} chance={5} />

        <CrateItem type={"coins"} amount={1600} rarity={3} chance={2} />
        <CrateItem
          type={"crate"}
          rarity={3}
          chance={2}
          hue={0}
          name="Premium crate"
        />
        <CrateItem
          type={"product"}
          rarity={3}
          chance={1}
          image={"https://i.imgur.com/qFPKnqw.png"}
          name="HD Webcam"
        />
      </View>
    );
  }
}
