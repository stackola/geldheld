import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SlotMachine from "react-native-slot-machine";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default class Slot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "0"
    };
  }
  spin() {
      this.slot.spinTo(getRandomInt(0,5));
    //this.setState({value:'zzzz'});
  }
  componentDidMount = () => {};

  render() {
    const symbols = ['☹️', '🤔', '🙂', '😀', '😲', '🤑'];
    return (
      <Wrapper>
        <Header title="Slot" />
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>


        <SlotMachine
          ref={ref => {
            this.slot = ref;
          }}
          height={240}
          width={160}
          renderContent={c => <Text style={{fontSize: 80, color:"white"}}>{symbols[c]}</Text>}
          useNativeDriver={true}
          duration={5000}
          padding={1}
          styles={{overlay:{backgroundColor:"none"}, slotWrapper:{backgroundColor:'none'}, slotInner:{backgroundColor:'none'},innerBorder:{borderWidth:0}, outerBorder:{backgroundColor:'none', borderWidth:0}, text:{color:"white"}}}
          text={this.state.value}
          initialAnimation={false}
          range="012345012345012345012345012345"
        />
                </View>
        <TouchableOpacity
          onPress={() => {
            this.spin();
          }}
          style={{ height: 80, backgroundColor: "red" }}
        />
      </Wrapper>
    );
  }
}
