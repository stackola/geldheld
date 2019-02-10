import React from "react";

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import { Provider } from "react-redux";
import store from "./redux/store";
import AuthLoadingScreen from "./refactor/screens/AuthLoadingScreen";

import Home from "./refactor/screens/Home";
import Games from "./refactor/screens/Games";
import Crates from "./refactor/screens/Crates";
import Challenges from "./refactor/screens/Challenges";
import Settings from "./refactor/screens/Settings";

import Shop from "./refactor/screens/Shop";
import Product from "./refactor/screens/Product";
import Category from "./refactor/screens/Category";

import Inventory from "./refactor/screens/Inventory";

import MyCrates from "./refactor/screens/MyCrates";
import MyCrate from "./refactor/screens/MyCrate";

import CratePage from "./refactor/screens/CratePage";
import MyTransactions from "./refactor/screens/MyTransactions";
import MyFriends from "./refactor/screens/MyFriends";
import MyOrders from "./refactor/screens/MyOrders";
import MyVouchers from "./refactor/screens/MyVouchers";

const AppStack = createStackNavigator(
  {
    Home: Home,
    Games: Games,
    Crates: Crates,
    Challenges: Challenges,
    Shop: Shop,
    Inventory: Inventory,
    MyCrates: MyCrates,
    MyCrate: MyCrate,
    MyTransactions: MyTransactions,
    MyFriends: MyFriends,
    MyOrders: MyOrders,
    MyVouchers: MyVouchers,
    CratePage: CratePage,
    Product: Product,
    Category: Category,
    Settings: Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      initialRouteName: "Home"
    })
  }
);

let Navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
export default class MainApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
