import React from "react";
import { Text, View } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import Earn from "./screens/Earn";
import CoinGame from "./screens/CoinGame";
import Slot from "./screens/Slot";
import Play from "./screens/Play";
import Shop from "./screens/Shop";
import Settings from "./screens/Settings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import store from "./redux/store";
import { Provider } from "react-redux";
import colors from "./colors";

const PlayStack = createStackNavigator(
  {
    Play,
    CoinGame,
    Slot
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      initialRouteName: "Play"
    })
  }
);

PlayStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const AppStack = createBottomTabNavigator(
  {
    Earn: Earn,
    Play: PlayStack,
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
