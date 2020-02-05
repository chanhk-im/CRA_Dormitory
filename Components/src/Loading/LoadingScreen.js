import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";

export default class LoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userData = await AsyncStorage.getItem("userData");

        this.props.navigation.navigate(userData ? "Main" : "Login");
    };

    render() {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    }
})
