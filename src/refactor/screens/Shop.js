import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import CrateButton from "../components/CrateButton";
import style from "../../style";
import Challenge from "../components/Challenge";
import ProductSquare from "../components/ProductSquare";
import Well from "../components/Well";
import Title from "../components/Title";
import StandardBox from "../components/StandardBox";
import ShopCategory from "../components/ShotCategory";
import ShopList from "../components/ShopList";

import { connect } from "react-redux";
import { ActionCreators } from "../../redux/actions";
import { bindActionCreators } from "redux";
import ColorButton from "../components/ColorButton";
import Button from "../components/Button";

export class Shop extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Shop" />
        <ScrollView style={{}}>
          {this.props.config.frontPageLists &&
            this.props.config.frontPageLists.map(s => {
              return <ShopList listId={s} key={s} />;
            })}
          {this.props.config.frontPageCategories &&
            this.props.config.frontPageCategories.map(s => {
              return <ShopCategory category={s} key={s} />;
            })}
          <Title style={{ paddingLeft: style.space + style.containerPadding }}>
            All Categories
          </Title>
          {this.props.config.storeCategories &&
            this.props.config.storeCategories.map(s => {
              return (
                <ColorButton small center route="Category" key={s} title={s} />
              );
            })}
        </ScrollView>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return { config: state.config };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
