import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl
} from "react-native";
import firebase from "react-native-firebase";
export default class CollectionLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true,
      refreshing: false
    };
  }

  componentDidMount() {
    this.get();
  }
  get() {
    let collection = this.props.collection;
    firebase
      .firestore()
      .collection(collection)
      .get()
      .then(snap => {
        console.log(snap);
        this.setState({
          loading: false,
          refreshing: false,
          items: snap._docs.map(d => {
            return d._data;
          })
        });
      });
  }
  refresh() {
    this.setState({ refreshing: true }, () => {
      this.get();
    });
  }
  render() {
    return this.state.loading ? (
      this.props.loading ? (
        this.props.loading
      ) : (
        <View>
          <ActivityIndicator />
        </View>
      )
    ) : (
      <FlatList
        ListHeaderComponent={this.props.header || null}
        ListFooterComponent={<View style={{ height: 8 }} />}
        style={this.props.style}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              this.refresh();
            }}
            refreshing={this.state.refreshing}
          />
        }
        keyExtractor={i => {
          return i.id;
        }}
        data={this.state.items}
        renderItem={this.props.renderItem}
      />
    );
  }
}
