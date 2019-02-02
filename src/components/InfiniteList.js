import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import firebase from "react-native-firebase";
export default class InfiniteList extends Component {
  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.state = {
      items: [],
      refreshKey: 0,
      refreshing: false,
      fetching: true,
      endReached: false
    };
  }
  fetchInitial() {
    let path = this.props.path;
    let where = this.props.where;
    let collection = this.props.collection;
    let order = this.props.orderBy || "time";
    let f = firebase.firestore();
    if (path) {
      f = f.doc(path);
    }
    f = f.collection(collection);
    if (where) {
      f = f.where(where[0], where[1], where[2]);
    }
    f.orderBy(order, "DESC")
      .limit(this.pageSize)
      .get()
      .then(snap => {
        console.log(snap);
        this.setState(
          {
            items: snap._docs,
            fetching: false,
            refreshing: false,
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
  refresh() {
    this.setState(
      { refreshing: true, refreshKey: this.state.refreshKey + 1 },
      () => {
        this.fetchInitial();
      }
    );
  }
  shouldFetchMore() {
    return this.state.fetching == false && this.state.endReached == false;
  }
  fetchMore() {
    if (this.shouldFetchMore()) {
      console.log("loading more!");
      let path = this.props.path;
      let where = this.props.where;
      let collection = this.props.collection;
      let order = this.props.orderBy || "time";
      this.setState({ fetching: true }, () => {
        let f = firebase.firestore();
        if (path) {
          f = f.doc(path);
        }
        f = f.collection(collection);
        if (where) {
          f = f.where(where[0], where[1], where[2]);
        }
        f.orderBy(order, "DESC")
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
        horizontal={this.props.horizontal}
        style={{ flex: 1, ...this.props.style }}
        refreshControl={
          <RefreshControl
            enabled={!this.props.noRefresh}
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.refresh();
            }}
          />
        }
        onEndReached={() => {
          this.fetchMore();
        }}
        onEndReachedThreshold={0.05}
        keyExtractor={i => {
          return i.id;
        }}
        ListHeaderComponent={
          (
            <View key={this.state.refreshKey.toString()}>
              {this.props.header}
            </View>
          ) || null
        }
        ListFooterComponent={
          <View
            style={{
              height: this.props.horizontal ? "auto" : 60,
              width: this.props.horizontal ? 100 : "auto",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.state.endReached && (
              <Text style={{ color: "white", fontSize: 12 }}>
                {this.state.items.length == 0 ? "Noting here." : "The end."}
              </Text>
            )}
            {!this.state.endReached && <ActivityIndicator color={"white"} />}
          </View>
        }
        data={this.state.items}
        renderItem={i => {
          //console.log(i.item._data);
          return this.props.renderItem(i.item._data);
        }}
      />
    );
  }
}
