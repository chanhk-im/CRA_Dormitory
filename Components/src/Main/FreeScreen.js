import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import PostScreen from "./PostScreen";

export default class FreeScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="Free" headerText="자유게시판" headerColor="#A7DEFE" fontSize="18"/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight
    },
    Header: {
        backgroundColor: "#3ED0C8"
    }
});
