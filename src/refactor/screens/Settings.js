import React, { Component } from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";
import { ActionCreators } from "../../redux/actions";
import { bindActionCreators } from "redux";

import style from "../../style";
import colors from "../../colors";
import ProductRow from "../components/ProductRow";
import Spacer from "../components/Spacer";
import StandardBox from "../components/StandardBox";
import Title from "../components/Title";
import ColorButton from "../components/ColorButton";
import {
  enableNotifications,
  updateAddress,
  disableNotifications
} from "../../lib";
export class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      notiLoading: false,
      addressStatus: "start",
      notiStatusOverride: null
    };
  }
  doUpdateAddress() {
    this.setState({ addressStatus: "loading" }, () => {
      updateAddress(this.state.input)
        .then(() => {
          this.setState({ addressStatus: "done" });
        })
        .catch(() => {
          this.setState({ addressStatus: "error" });
        });
    });
  }

  doEnableNotifications() {
    this.setState({ notiLoading: true }, () => {
      enableNotifications()
        .then(() => {
          this.setState({ notiLoading: false, notiStatusOverride: true });
        })
        .catch(() => {
          this.setState({ notiLoading: false });
        });
    });
  }

  doDisableNotifications() {
    this.setState({ notiLoading: true }, () => {
      disableNotifications()
        .then(() => {
          this.setState({ notiLoading: false, notiStatusOverride: false });
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

    if (this.state.notiStatusOverride != "null") {
      notsOn = this.state.notiStatusOverride;
    }
    return (
      <Wrapper>
        <Header title={"Settings"} showBack />
        <ScrollView>
          <Spacer />
          <StandardBox>
            <Title style={{ marginBottom: 0 }}>Stored shipping address:</Title>
            <TextInput
              placeholder={"Name\nAddress\nCity & ZIP code\nState & Country"}
              placeholderTextColor={colors.textMinor}
              onChangeText={t => {
                this.setState({ input: t });
              }}
              value={this.state.input}
              style={{
                color: colors.text,
                textAlignVertical: "top",
                borderBottomWidth: 2,
                borderColor: "#ddd"
              }}
              multiline={true}
              numberOfLines={4}
            />
            <Spacer />
            <ColorButton
              small
              noMargin
              loading={this.state.addressStatus == "loading"}
              done={this.state.addressStatus == "done"}
              error={this.state.addressStatus == "error"}
              onPress={() => {
                this.doUpdateAddress();
              }}
              center
              smallFont
              hue={220}
              style={{ marginBottom: style.space / 2 }}
            >
              Update
            </ColorButton>
          </StandardBox>
          {notsOn && (
            <StandardBox style={{}}>
              <Title style={{ textAlign: "center" }}>
                <Icon name="check" size={16} color={colors.green} />{" "}
                Notifications enabled
              </Title>
              <Spacer />
              <ColorButton
                small
                noMargin
                loading={this.state.notiLoading}
                smallFont
                onPress={() => {
                  this.doDisableNotifications();
                }}
                center
                hue={10}
                style={{ marginBottom: style.space / 2 }}
                l={20}
              >
                Press to disable
              </ColorButton>
            </StandardBox>
          )}
          {!notsOn && (
            <StandardBox style={{}}>
              <Title style={{ textAlign: "center" }}>
                <Icon name="close" size={16} color={colors.red} /> Notifications
                disabled
              </Title>
              <Spacer />
              <ColorButton
                loading={this.state.notiLoading}
                small
                noMargin
                smallFont
                onPress={() => {
                  this.doEnableNotifications();
                }}
                center
                hue={130}
                style={{ marginBottom: style.space / 2 }}
                l={20}
              >
                Press to enable
              </ColorButton>
            </StandardBox>
          )}
          <ColorButton small smallFont center hue={220}>
            Link Facebook account
          </ColorButton>
          <ColorButton small smallFont center hue={200}>
            Link Twitter account
          </ColorButton>
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
)(Settings);
