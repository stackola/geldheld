import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../colors";

import { connect } from "react-redux";
import { ActionCreators } from "../redux/actions";
import { bindActionCreators } from "redux";

class UserButton extends PureComponent {
  render() {
    let user = this.props.user.id ? this.props.user : null;
    return user ? (
      <TouchableOpacity
        style={{
          width: 60,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 8
        }}
      >
        <Icon name="coin" color={colors.action} size={25} />
        <Text style={{ fontWeight: "bold" }}>{user.coins}</Text>
      </TouchableOpacity>
    ) : (
      <View
        style={{
          width: 60,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 8
        }}
      >
        <ActivityIndicator color={colors.background} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserButton);
