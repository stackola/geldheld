import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import firebase from "react-native-firebase";
export default class InfiniteList extends Component {
  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.state = {
      items: [],
      fetching: true,
      endReached: false
    };
  }
  fetchInitial() {
    let path = this.props.path;
    let collection = this.props.collection;
    let order = this.props.orderBy || "time";
    firebase
      .firestore()
      .doc(path)
      .collection(collection)
      .orderBy(order, "DESC")
      .limit(this.pageSize)
      .get()
      .then(snap => {
        console.log(snap);
        this.setState(
          {
            items: snap._docs,
            fetching: false,
            endReached: snap._docs.length != this.pageSize
          },
          () => {
            //console.log(this.state);
          }
        );
      });
  }
  componentDidMount() {
    this.fetchInitial();
  }
  shouldFetchMore() {
    return this.state.fetching == false && this.state.endReached == false;
  }
  fetchMore() {
    if (this.shouldFetchMore()) {
      console.log("loading more!");
      let path = this.props.path;
      let collection = this.props.collection;
      let order = this.props.orderBy || "time";
      this.setState({ fetching: true }, () => {
        firebase
          .firestore()
          .doc(path)
          .collection(collection)
          .orderBy(order, "DESC")
          .startAfter(this.state.items[this.state.items.length - 1])
          .limit(this.pageSize)
          .get()
          .then(snap => {
            console.log(snap);
            this.setState(
              {
                items: [...this.state.items, ...snap._docs],
                fetching: false,
                endReached: snap._docs.length != this.pageSize
              },
              () => {
                //console.log(this.state);
              }
            );
          });
      });
    } else {
      console.log("not fetching more");
    }
  }
  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        onEndReached={() => {
          this.fetchMore();
        }}
        onEndReachedThreshold={0.05}
        keyExtractor={i => {
          return i.id;
        }}
        data={this.state.items}
        renderItem={i => {
          //console.log(i.item._data);
          return this.props.renderItem(i.item._data);
        }}
      />
    );
  }
}
