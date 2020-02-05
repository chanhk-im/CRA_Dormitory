import React, { Component } from "react";
import { Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoadingScreen from "./src/Loading/LoadingScreen";
import LoginScreen from "./src/Login/LoginScreen";
import SignupScreen from "./src/Login/SignupScreen";
import NoticeScreen from "./src/Main/NoticeScreen";
import FreeScreen from "./src/Main/FreeScreen";
import RcScreen from "./src/Main/RcScreen";
import ChattingScreen from "./src/Main/ChattingScreen";
import SettingScreen from "./src/Main/SettingScreen";
import WriteScreen from "./src/Main/WriteScreen";
import PostCardScreen from "./src/Main/PostCardScreen";
import UpdateScreen from "./src/Main/UpdateScreen";
import CommentScreen from "./src/Main/CommentScreen";
import RcTorScreen from "./src/Main/RcTorScreen";
import RcKuyScreen from "./src/Main/RcKuyScreen";
import RcSonScreen from "./src/Main/RcSonScreen";
import RcPhiScreen from "./src/Main/RcPhiScreen";
import RcCarScreen from "./src/Main/RcCarScreen";
import RcJanScreen from "./src/Main/RcJanScreen";

const LoadingStack = createStackNavigator (
    {
        LoadingScreen,
    },
    {
        headerMode: "none"
    }
)

const LoginStack = createStackNavigator(
    {
        LoginScreen,
        NoticeScreen,
        SignupScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: "Login",
            header: null
        }),
        initialRouteName: "LoginScreen"
    }
);
const NoticeStack = createStackNavigator(
    {
        NoticeScreen,
        WriteScreen,
        PostCardScreen,
        UpdateScreen,
        CommentScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: "Notice",
            header: null
        }),
        initialRouteName: "NoticeScreen"
    }
);

const FreeStack = createStackNavigator(
    {
        FreeScreen,
        WriteScreen,
        PostCardScreen,
        UpdateScreen,
        CommentScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: "Free",
            header: null
        }),
        initialRouteName: "FreeScreen"
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
        CommentScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: "Rc",
            header: null
        }),
        initialRouteName: "RcScreen"
    }
);

const ChattingStack = createStackNavigator(
    {
        ChattingScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: "Chatting",
            header: null
        }),
        initialRouteName: "ChattingScreen"
    }
);

const SettingStack = createStackNavigator(
    {
        SettingScreen,
        LoginScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: "Setting",
            header: null
        }),
        initialRouteName: "SettingScreen"
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Notice: NoticeStack,
        Free: FreeStack,
        Rc: RcStack,
        Chatting: ChattingStack,
        Setting: SettingStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let icon = "▲";

                if (routeName === "Notice") {
                    icon = "📍";
                } else if (routeName === "Free") {
                    icon = "📌";
                } else if (routeName === "Rc") {
                    icon = "🏠";
                } else if (routeName === "Chatting") {
                    icon = "🗣";
                } else if (routeName === "Setting") {
                    icon = "⚙️";
                }

                // can use react-native-vector-icons
                // <Icon name={iconName} size={iconSize} color={iconColor} />
                return <Text style={{ color: (focused && "#46c3ad") || "#888" }}>{icon}</Text>;
            }
        }),
        lazy: false,
        tabBarOptions: {
            activeTintColor: "#46c3ad",
            inactiveTintColor: "#888"
        }
    }
);

const AppStack = createSwitchNavigator({
    Login: {
        screen: LoginStack,
        //screen : LoginScreen,
        navigationOptions: {
            header: () => {
                false;
            }
        }
    },
    TabNavigator: {
        screen: TabNavigator,
        navigationOptions: ({ navigation }) => ({
            headerShown: false
        })
    }
});

export default createAppContainer(AppStack);
