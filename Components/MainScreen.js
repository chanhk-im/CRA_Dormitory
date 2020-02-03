import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from './src/Screen/LoginScreen';
import SignupScreen from '././src/Screen/SignupScreen';
//import SearchScreen from '././src/Screen/SearchScreen';
import CommentScreen from "./src/Screen/CommentScreen";
import NoticeScreen from "./src/Screen/NoticeScreen";
import FreeScreen from "./src/Screen/FreeScreen";
import RcScreen from "./src/Screen/RcScreen";
import ChattingScreen from "./src/Screen/ChattingScreen";
import SettingScreen from "./src/Screen/SettingScreen";
import WriteScreen from "./src/Write/WriteScreen";
import PostCardScreen from "./src/PostCard/PostCardScreen";
import UpdateScreen from "./src/Update/UpdateScreen";
import RcTorScreen from "./src/Screen/RcTorScreen";
import RcKuyScreen from "./src/Screen/RcKuyScreen";
import RcSonScreen from "./src/Screen/RcSonScreen";
import RcPhiScreen from "./src/Screen/RcPhiScreen";
import RcCarScreen from "./src/Screen/RcCarScreen";
import RcJanScreen from "./src/Screen/RcJanScreen";

const LoginStack = createStackNavigator(
  {
      LoginScreen,
      NoticeScreen,
      SignupScreen,
      //TabNavigator,
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: 'Login',
          header:null,
      }),
      initialRouteName: 'LoginScreen',
  }
);
const NoticeStack = createStackNavigator(
  {
      NoticeScreen,
      WriteScreen,
      PostCardScreen,
      UpdateScreen,
      //SearchScreen,
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: 'Notice',
          header:null,
      }),
      initialRouteName: 'NoticeScreen',
  }
);

const FreeStack = createStackNavigator(
  {
      FreeScreen,
      WriteScreen,
      PostCardScreen,
      UpdateScreen,
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: 'Free',
          header:null,
      }),
      initialRouteName: 'FreeScreen',
  }
);

const RcStack = createStackNavigator(
  {
      RcScreen,
      RcTorScreen,
      RcKuyScreen,
      RcSonScreen,
      RcPhiScreen,
      RcCarScreen,
      RcJanScreen,
      WriteScreen,
      PostCardScreen,
      UpdateScreen,
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: 'Rc',
          header:null,
      }),
      initialRouteName: 'RcScreen',
  }
);

const ChattingStack = createStackNavigator(
  {
      ChattingScreen,
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: 'Chatting',
          header:null,
      }),
      initialRouteName: 'ChattingScreen',
  }
);

const SettingStack = createStackNavigator(
  {
      SettingScreen,
      LoginScreen,
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: 'Setting',
          header:null,
      }),
      initialRouteName: 'SettingScreen',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
      Notice: NoticeStack,
      Free: FreeStack,
      Rc: RcStack,
      Chatting : ChattingStack,
      Setting : SettingStack
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          tabBarIcon: ({focused, horizontal, tintColor}) => {
              const {routeName} = navigation.state;
              let icon = "▲";

              if(routeName === 'Notice'){
                  icon = "📍";
              } else if(routeName === 'Free'){
                  icon = "📌"
              } else if(routeName === 'Rc'){
                icon = "🏠"
              } else if(routeName === 'Chatting'){
                icon = "🗣"
              } else if(routeName === 'Setting'){
                icon = "⚙️"
              }

              // can use react-native-vector-icons
              // <Icon name={iconName} size={iconSize} color={iconColor} />
              return <Text style={{color: focused && "#46c3ad" || "#888"}}>{icon}</Text>
          }
      }),
      lazy: false,
      tabBarOptions: {
          activeTintColor: "#46c3ad",
          inactiveTintColor: "#888",
      },
  }
);

const AppStack = createSwitchNavigator(
  {
      Login: {
        screen: LoginStack,
        //screen : LoginScreen,
        navigationOptions: {
          header: () => {false}
        }
      },
      TabNavigator: {
          screen: TabNavigator,
          navigationOptions: ({navigation}) => ({
              headerShown: false,
          }),
      },
  }
);

export default createAppContainer(AppStack);