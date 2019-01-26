import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

export default class CoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      side: "heads",
      status: "static"
    };
  }

  componentDidMount() {
    
  }

  spin(){
    this.setState({ side: "heads", status: "running" }, () => {
      setTimeout(() => {
        
      }, 5000);
    });
  }

  render() {
    return (
      <Wrapper>
        <Header title="Coin flip" />
        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.state.status == "static" && (
            <Image
              source={{ uri: this.state.side + "_static" }}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          )}
          {this.state.status == "running" && (
            <Image
              source={{ uri: this.state.side }}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={{ height: 100 }}>
        <TouchableOpacity style={{height:60, backgroundColor:'red'}} onPress={()=>{this.spin()}}></TouchableOpacity>
        </View>
      </Wrapper>
    );
  }
}
