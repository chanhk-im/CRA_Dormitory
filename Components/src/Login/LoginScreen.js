import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, AsyncStorage, TouchableWithoutFeedback, Keyboard } from "react-native";

import { ip, port } from "../../../Secret";

export default class LoginScreen extends Component {
    state = {
        newId: "",
        newPassword: ""
    };

    constructor(props) {
        super(props);
        this._onPressLogin = this._onPressLogin.bind(this);
        this._onPressSignup = this._onPressSignup.bind(this);
    }

    _onPressEmptySpace() {
        Keyboard.dismiss();
    }
    
    _onPressLogin() {
        Keyboard.dismiss();
        this._doLogin();
    }

    _onPressSignup() {
        Keyboard.dismiss();
        this._doSignup();
    }

    _doLogin() {
        fetch(`http://${ip}:${port}/api/users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.newId,
                password: this.state.newPassword
            })
        })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.error) {
                    console.log(resJson.error);
                } else {
                    console.log(resJson);
                    this._signinAsync(resJson);
                }
            });
    }

    _doSignup() {
        this.props.navigation.navigate("SignupScreen");
    }

    async _signinAsync(data) {
        const saveData = JSON.stringify(data);
        await AsyncStorage.setItem("userData", saveData);
        this.props.navigation.navigate("Main");
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._onPressEmptySpace}>
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Image style={{ width: 220, height: 120 }} source={require("./../../../img/home.png")} />
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        style={styles.textForm}
                        placeholder={"ID"}
                        autoCorrect={false}
                        onChangeText={t => this.setState({ newId: t })}
                    />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"Password"}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={t => this.setState({ newPassword: t })}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this._onPressLogin}>
                    <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>아직 계정이 없습니까? </Text>
                <TouchableOpacity onPress={this._onPressSignup}>
                    <Text style={styles.signupButton}> 회원가입</Text>
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    titleArea: {
        width: "100%",
        marginTop: 30,
        alignItems: "center",
        margin: 40
    },
    formArea: {
        width: "100%"
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: "#888",
        width: "75%",
        height: 45,
        marginHorizontal: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 30,
        margin: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    button: {
        backgroundColor: "#4278BA",
        width: "45%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    buttonTitle: {
        color: "white"
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingVertical: 30,
        flexDirection: "row"
    },
    signupText: {
        color: "gray",
        fontSize: 20,
        marginTop: 100
    },
    signupButton: {
        margin: 20,
        color: "rgba(255,0,0,0.4)",
        fontSize: 20,
        fontWeight: "500"
    }
});
