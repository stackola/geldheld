import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from '../colors';
export default class UserButton extends PureComponent {
  render() {
    return (
      <TouchableOpacity style={{width:60, alignItems:'center', justifyContent:'center'}}>
          <Icon name="coin" color={colors.action} size={25}/>
        <Text style={{fontWeight:"bold"}}>50</Text>
      </TouchableOpacity>
    )
  }
}
