import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";

import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import ShopItemSquare from "../atoms/ShopItemSquare";
import ShopCategory from "../components/ShopCategory";
import ShopList from "../components/ShopList";
import Button from "../atoms/Button";

import { connect } from "react-redux";
import { ActionCreators } from "../redux/actions";
import { bindActionCreators } from "redux";

class Shop extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="Shop" />
        <ScrollView>
          <View style={{ height: 8 }} />
          {this.props.config.frontPageLists.map(s => {
            return <ShopList listId={s} key={s} />;
          })}
          {this.props.config.frontPageCategories.map(s => {
            return <ShopCategory category={s} key={s} />;
          })}
          {this.props.config.storeCategories.map(s => {
            return (
              <Button
                path="CategoryPage"
                key={s}
                title={s}
                params={{ category: s }}
                theKey={s}
              />
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
