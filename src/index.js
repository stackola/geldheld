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
import Shop from "./screens/Shop";
import Settings from "./screens/Settings";

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

const CrateStack = createStackNavigator(
  {
    CratesHome: Crates,
    CratePage,
    MyCrate
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      initialRouteName: "CratesHome"
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

const AppStack = createBottomTabNavigator(
  {
    Earn: Earn,
    Play: PlayStack,
    Crates: CrateStack,
    Shop,
    Settings
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
        if (routeName === "Settings") {
          iconName = `settings`;
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
