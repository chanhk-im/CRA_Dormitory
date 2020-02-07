import React, { Component } from "react";
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from "react-native";
import PickerBox from "react-native-picker-box";

import { ip, port } from "../../../Secret";

export default class SignupScreen extends Component {
    state = {
        data: [
            { label: "토레이 RC", value: "RcTor" },
            { label: "장기려 RC", value: "RcJan" },
            { label: "손양원 RC", value: "RcSon" },
            { label: "카이퍼 RC", value: "RcKuy" },
            { label: "열송학사", value: "RcPhi" },
            { label: "Carmichael RC", value: "RcCar" },
            { label: "해당없음", value: "n/a" }
        ],
        selectedValue: "RC를 선택해 주세요.                                          ▼",
        newId: "",
        newPassword: "",
        newPasswordCheck: "",
        newEmail: "",
        newName: "",
        newRc: ""
    };

    _doLogin() {
        this.props.navigation.replace("LoginScreen");
    }

    _doSignup() {
        this.props.navigation.navigate("SignupScreen");
    }

    _settingRc() {
        const selected = this.state.selectedValue;
        const rc = this.state.data.filter(function(l) {
            return l.label === selected;
        });
        this.setState({
            newRc: rc[0]
        });

        console.log(this.state.newRc);
    }

    async _completeSignup() {
        const selected = this.state.selectedValue;
        const rc = this.state.data.filter(function(l) {
            return l.label === selected;
        });
        if (!this.state.newName) {
            Alert.alert("Error", "이름을 작성해 주세요.", [{ text: "확인" }]);
        } else if (!this.state.newId || this.state.newId.includes(" ")) {
            Alert.alert("Error", "유효하지 않은 ID입니다.", [{ text: "확인" }]);
        } else if (!this.state.newPassword || this.state.newPassword.length < 8 || this.state.newPassword.length > 12) {
            Alert.alert("Error", "유효하지 않은 비밀번호입니다.", [{ text: "확인" }]);
        } else if (this.state.newPassword !== this.state.newPasswordCheck) {
            Alert.alert("Error", "비밀번호가 일치하지 않습니다.", [{ text: "확인" }]);
        } else if (!this.state.newEmail) {
            Alert.alert("Error", "이메일을 작성해 주세요.", [{ text: "확인" }]);
        } else if (/handong.edu$/.exec(this.state.newEmail) == null) {
            Alert.alert("Error", "한동대 이메일이 아닙니다.", [{ text: "확인" }]);
        } else {
            await fetch(`http://${ip}:${port}/api/users/signup`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: this.state.newId,
                    password: this.state.newPassword,
                    passwordchcek: this.state.newPasswordCheck,
                    email: this.state.newEmail,
                    name: this.state.newName,
                    rc: rc[0]
                })
            })
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.result === "id is exist") {
                        console.log("id is exist");
                        return;
                    }

                    console.log("success");
                })
                .then(Alert.alert("완료", "회원가입이 완료되었습니다", [{ text: "확인", onPress: () => this.props.navigation.goBack() }]));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Image style={{ width: 100, height: 100 }} source={require("./../../../img/hguhouse.jpeg")} />
                </View>
                <KeyboardAvoidingView
                    style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
                    behavior="padding"
                    enabled
                    keyboardVerticalOffset={20}
                >
                    <ScrollView>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <TextInput
                                style={styles.textForm}
                                placeholder={"이름"}
                                value={this.state.newName}
                                autoCorrect={false}
                                onChangeText={t => this.setState({ newName: t })}
                            />
                            <TextInput
                                style={styles.textForm}
                                placeholder={"ID"}
                                value={this.state.newId}
                                autoCorrect={false}
                                onChangeText={t => this.setState({ newId: t })}
                            />
                            <TextInput
                                style={styles.textForm}
                                placeholder={"Password (8 ~ 12글자)"}
                                secureTextEntry={true}
                                value={this.state.newPassword}
                                autoCorrect={false}
                                secureTextEntry={true}
                                onChangeText={t => this.setState({ newPassword: t })}
                            />
                            <TextInput
                                style={styles.textForm}
                                placeholder={"Password Check"}
                                secureTextEntry={true}
                                value={this.state.newPasswordCheck}
                                autoCorrect={false}
                                secureTextEntry={true}
                                onChangeText={t => this.setState({ newPasswordCheck: t })}
                            />
                            <TextInput
                                style={styles.textForm}
                                placeholder={"한동 이메일 주소"}
                                value={this.state.newEmail}
                                autoCorrect={false}
                                onChangeText={t => this.setState({ newEmail: t })}
                            />
                            <View style={styles.pickBox}>
                                <Text style={styles.selectv} onPress={() => this.myref.openPicker()}>
                                    {this.state.selectedValue}
                                </Text>
                            </View>
                            <PickerBox
                                ref={ref => (this.myref = ref)}
                                data={this.state.data}
                                onValueChange={value => {
                                    this.setState({ selectedValue: value });
                                }}
                                selectedValue={this.state.selectedValue}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.button} onPress={this._completeSignup.bind(this)}>
                    <Text style={styles.buttonTitle}>회원가입</Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>이미 계정이 있습니까? </Text>
                <TouchableOpacity onPress={this._doLogin.bind(this)}>
                    <Text style={styles.signupButton}> 로그인하기</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight
    },
    titleArea: {
        width: "100%",
        marginTop: 20,
        alignItems: "center",
        margin: 40
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: "#888",
        width: 300,
        height: 45,
        marginHorizontal: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 30,
        margin: 10,
        borderRadius: 10
    },
    logoText: {
        marginVertical: 15,
        fontSize: 28,
        color: "rgba(0,0,0,0.5)"
    },
    inputBox: {
        width: 300,
        height: 50,
        borderBottomWidth: 2,
        marginBottom: 10,
        borderBottomColor: "rgba(183,188,193,0.4)",
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "black",
        marginVertical: 5
    },
    button: {
        width: 300,
        backgroundColor: "rgb(6,44,101)",
        borderRadius: 15,
        marginVertical: 15,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonTitle: {
        color: "white"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        textAlign: "center"
    },
    choicetext: {
        width: 270,
        fontSize: 16,
        marginVertical: 5,
        fontWeight: "400",
        marginBottom: 3
    },
    selectv: {
        width: 300,
        height: 20,
        paddingLeft: 30
    },
    pickBox: {
        borderWidth: 0.5,
        borderColor: "#888",
        width: 300,
        height: 45,
        marginHorizontal: 50,
        justifyContent: "center",
        margin: 10,
        borderRadius: 10,
        fontSize: 16
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
        fontSize: 16,
        marginTop: 60
    },
    signupButton: {
        color: "rgba(255,0,0,0.4)",
        fontSize: 17,
        fontWeight: "500",
        marginTop: 5,
        marginBottom: 40
    }
});
