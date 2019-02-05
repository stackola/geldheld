import React from "react";

import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import { Provider } from "react-redux";
import store from "./redux/store";

import colors from "./colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import Earn from "./screens/Earn";
import CoinGame from "./screens/CoinGame";
import Slot from "./screens/Slot";
import Play from "./screens/Play";
import Crates from "./screens/Crates";
import CratePage from "./screens/CratePage";
import MyCrate from "./screens/MyCrate";
import MyCrates from "./screens/MyCrates";
import MyVouchers from "./screens/MyVouchers";
import MyTransactions from "./screens/MyTransactions";
import MyOrders from "./screens/MyOrders";
import IAP from "./screens/IAP";
import MyProfile from "./screens/MyProfile";
import MyFriends from "./screens/MyFriends";
import Shop from "./screens/Shop";
import Product from "./screens/Product";
import BuyProduct from "./screens/BuyProduct";
import Settings from "./screens/Settings";
import CategoryPage from "./screens/CategoryPage";
import Screen from "./screens/refactor/Screen";

const PlayStack = createStackNavigator(
  {
    PlayHome: Play,
    CoinGame,
    Slot
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      initialRouteName: "PlayHome"
    })
  }
);

const ShopStack = createStackNavigator(
  {
    ShopHome: Shop,
    CategoryPage: CategoryPage,
    Product: Product,
    BuyProduct: BuyProduct,
    IAP: IAP
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      initialRouteName: "ShopHome"
    })
  }
);

const CrateStack = createStackNavigator(
  {
    CratesHome: Crates,
    CratePage
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      initialRouteName: "CratesHome"
    })
  }
);

const SettingsStack = createStackNavigator(
  {
    SettingsHome: Settings,
    MyCrates,
    SettingsMyCrate: MyCrate,
    MyVouchers: MyVouchers,
    MyTransactions,
    MyOrders,
    MyProfile,
    MyFriends
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      initialRouteName: "SettingsHome"
    })
  }
);

let v = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

PlayStack.navigationOptions = v;
CrateStack.navigationOptions = v;
SettingsStack.navigationOptions = v;
ShopStack.navigationOptions = v;

const AppStack = createBottomTabNavigator(
  {
    Earn: Earn,
    Play: PlayStack,
    Crates: CrateStack,
    Shop: ShopStack,
    Account: SettingsStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: () => {
        return navigation.state.routeName != "CoinGame";
      },
      initialRouteName: "Earn",
      header: null,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = "plus";
        if (routeName === "Home") {
          iconName = "home-outline";
        }
        if (routeName === "Account") {
          iconName = `account`;
        }

        if (routeName === "Earn") {
          iconName = `coin`;
        }

        if (routeName === "Crates") {
          iconName = `gift`;
        }

        if (routeName === "Shop") {
          iconName = `cart-outline`;
        }

        if (routeName === "Play") {
          iconName = `cards-playing-outline`;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.action,
      inactiveTintColor: colors.background
    }
  }
);

let Navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Test: Screen,
    },
    {
      initialRouteName: "Test"
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
