import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Button from "../atoms/Button";

import { connect } from "react-redux";
import { ActionCreators } from "../redux/actions";
import { bindActionCreators } from "redux";
import colors from "../colors";
import {
  disableNotifications,
  enableNotifications,
  updateAddress,
  getInviteLink
} from "../lib";

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      notiLoading: false
    };
  }

  doEnableNotifications() {
    this.setState({ notiLoading: true }, () => {
      enableNotifications()
        .then(() => {
          this.setState({ notiLoading: false });
        })
        .catch(() => {
          this.setState({ notiLoading: false });
        });
    });
  }

  doUpdateAddress() {
    this.setState({ addressLoading: true }, () => {
      updateAddress(this.state.input)
        .then(() => {
          this.setState({ addressLoading: false });
        })
        .catch(() => {
          this.setState({ addressLoading: false });
        });
    });
  }
  doDisableNotifications() {
    this.setState({ notiLoading: true }, () => {
      disableNotifications()
        .then(() => {
          this.setState({ notiLoading: false });
        })
        .catch(() => {
          this.setState({ notiLoading: false });
        });
    });
  }
  componentDidMount() {
    this.setState({ input: this.props.user.address });
  }
  render() {
    let notsOn =
      this.props.user.notificationsEnabled && !!this.props.user.token;
    return (
      <Wrapper>
        <Header title="My Profile" showBack />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              margin: 8,
              backgroundColor: "white",
              borderRadius: 4,
              padding: 8
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Stored address:
            </Text>
            <TextInput
              style={{
                textAlignVertical: "top",
                margin: 4,
                marginTop: 0,
                borderBottomWidth: 2,
                borderColor: "#ddd"
              }}
              onChangeText={t => {
                this.setState({ input: t });
              }}
              multiline={true}
              numberOfLines={5}
              value={this.state.input}
            />
            <TouchableOpacity
              onPress={() => {
                this.doUpdateAddress();
              }}
              style={{
                backgroundColor: colors.action,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                borderRadius: 4
              }}
            >
              {this.state.addressLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Update
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              margin: 8,
              backgroundColor: "white",
              borderRadius: 4,
              padding: 8
            }}
          >
            {notsOn && (
              <View
                style={{
                  height: 30,
                  backgroundColor: "green",
                  borderRadius: 4,
                  marginBottom: 8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Notifications are enabled
                </Text>
              </View>
            )}
            {!notsOn && (
              <View
                style={{
                  height: 30,
                  backgroundColor: "red",
                  borderRadius: 4,
                  marginBottom: 8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Notifications are disabled
                </Text>
              </View>
            )}
            {notsOn && (
              <TouchableOpacity
                onPress={() => {
                  this.doDisableNotifications();
                }}
                style={{
                  backgroundColor: colors.action,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  borderRadius: 4
                }}
              >
                {!this.state.notiLoading && (
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Click to disable
                  </Text>
                )}
                {this.state.notiLoading && <ActivityIndicator />}
              </TouchableOpacity>
            )}
            {!notsOn && (
              <TouchableOpacity
                onPress={() => {
                  this.doEnableNotifications();
                }}
                style={{
                  backgroundColor: colors.action,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  borderRadius: 4
                }}
              >
                {!this.state.notiLoading && (
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Click to enable
                  </Text>
                )}
                {this.state.notiLoading && <ActivityIndicator />}
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </Wrapper>
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
)(MyProfile);
