import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class AuthLoadingScreen extends Component {
  componentDidMount(){
    this.props.navigation.navigate("App");
  }
  
  render() {
    return (
      <View>
        <Text> AuthLoadingScreen </Text>
      </View>
    )
  }
}
