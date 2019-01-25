import React from "react";
import { Text, View } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Home from "./screens/Home";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import Earn from "./screens/Earn";
import Play from "./screens/Play";
import Shop from "./screens/Shop";
import Settings from "./screens/Settings";
//import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import store from "./redux/store";
import { Provider } from "react-redux";
class OtherScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Other!</Text>
      </View>
    );
  }
}

const AppStack = createBottomTabNavigator(
  {
    Home: Home,
    Earn: Earn,
    Play,
    Shop,
    Settings
    //Details: Details,
    //Report: Report,
    //Profile: Profile,
    //MyPosts: MyPosts,
    //Chat: Chat,
    //Chats: Chats
    /*
  SingleComment: SingleComment,
  Events: Events,
  EditProfile: EditProfile,
  Group: Group,
  ImageView: ImageView,
  Profile: Profile,
  CreateGroup: CreateGroup,
  Messages: Messages,
  Message: Message,*/
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      /*tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName="plus";
        if (routeName === "Home") {
          iconName = 'home';
          
        } else if (routeName === "Settings") {
          iconName = `gear`;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color={tintColor} />;
      }*/
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
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
