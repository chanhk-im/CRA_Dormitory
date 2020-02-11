import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import PostScreen from "./PostScreen";

export default class NoticeScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="RcJan" headerText="장기려 RC게시판" headerColor="#3ED0C8" />;
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
