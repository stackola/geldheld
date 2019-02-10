import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Button from "../components/Button";
import Well from "../components/Well";
import DeleteableMessage from "../components/DeleteableMessage";
import StandardBox from "../components/StandardBox";

import style from "../../style";
import Offer from "../components/Offer";
import Transaction from "../components/Transaction";
import Title from "../components/Title";
import colors from "../../colors";
import ProgressBar from "../components/ProgressBar";
import SText from "../components/SText";
import Challenge from "../components/Challenge";
import ProductRow from "../components/ProductRow";
import Order from "../components/Order";
import Friend from "../components/Friend";
import Voucher from "../components/Voucher";
import OfferList from "../components/OfferList";
export class Home extends Component {
  render() {
    return (
      <Wrapper>
        <Header title={"Home"} />
        <OfferList />
      </Wrapper>
    );
  }
}

export default Home;
