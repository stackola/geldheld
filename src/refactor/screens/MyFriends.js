import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Clipboard,
  TouchableOpacity
} from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Friend from "../components/Friend";
import style from "../../style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../colors";
import InfiniteList from "../components/InfiniteList";
import { getUID, getInviteLink } from "../../lib";
import StandardBox from "../components/StandardBox";
import Spacer from "../components/Spacer";
import SText from "../components/SText";

export class MyFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "loading..."
    };
  }
  componentDidMount() {
    getInviteLink().then(url => {
      this.setState({ url: url });
    });
  }
  copyToClip() {
    if (this.state.url != "loading...") {
      Clipboard.setString(this.state.url);
      ToastAndroid.showWithGravity(
        "Copied to clip board",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }
  }
  render() {
    return (
      <Wrapper>
        <Header title="My Friends" showBack />
        <InfiniteList
          header={
            <React.Fragment>
              <Spacer />
              <StandardBox>
                <TouchableOpacity
                  onPress={() => {
                    this.copyToClip();
                  }}
                >
                  <SText style={{ fontWeight: "bold", fontSize: 15 }}>
                    Invite Link
                  </SText>
                  <Spacer size={style.space / 2} />
                  <SText style={{}}>
                    Send this link to your friends and earn 10% of their
                    earnings!
                  </SText>
                  <Spacer size={style.space / 2} />
                  <SText
                    style={{
                      borderBottomWidth: 2,
                      borderColor: "#ddd"
                    }}
                  >
                    {this.state.url}
                  </SText>
                  <Spacer size={style.space / 2} />
                </TouchableOpacity>
              </StandardBox>
            </React.Fragment>
          }
          loading={<Friend loading />}
          path={"users/" + getUID()}
          collection={"vouchers"}
          orderBy={"time"}
          renderItem={i => {
            return <Friend {...i} />;
          }}
        />
      </Wrapper>
    );
  }
}

export default MyFriends;
