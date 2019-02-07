import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";
import { ActionCreators } from "../../../redux/actions";
import { bindActionCreators } from "redux";
import colors from "../../../colors";
import style from "../../../style";
import { formatMoney } from "../../../lib";

class UserButton extends PureComponent {
  render() {
    let user = this.props.user.id ? this.props.user : null;
    user = { coins: formatMoney(100000) };
    return user && this.props.hide !== true ? (
      <TouchableOpacity
        style={{
          width: 60,
          alignItems: "center",
          justifyContent: "center",
          marginRight: style.space / 2
        }}
      >
        <Icon name="coin" color={colors.action} size={25} />
        <Text style={{ fontWeight: "bold", color: colors.text }}>
          {user.coins}
        </Text>
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
        <ActivityIndicator color={colors.text} />
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
