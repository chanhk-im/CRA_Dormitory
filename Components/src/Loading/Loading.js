import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.indicator}>
                    <ActivityIndicator size="large" color="#d6336c" />
                </View>
                <View style={styles.textbox}>
                    <Text style={styles.text}>Loading...</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    indicator: {
        justifyContent: "center",
        alignItems: "center"
    },
    textbox: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    text: {
        fontSize: 15,
    }
});
