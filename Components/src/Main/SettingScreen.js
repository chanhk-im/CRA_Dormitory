import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, AsyncStorage } from "react-native";
import { Card, CardItem,Icon, Container, Content, Header, Left, Right, Body } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SettingScreen extends Component {
    static navigationOptions = {
        title: '설정',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-settings' style={{ color: tintColor }} />
        )
    }

    state = {
        user: {},
    }

    componentDidMount() {
        this._loadUserInfo();
    }

    _loadUserInfo() {
        AsyncStorage.getItem("userData").then(data => {
            const user = JSON.parse(data || "[]");
            this.setState({ user });
        });
    }

    _checkLogout(){
        Alert.alert(
            "Logout",
            "로그아웃 하시겠습니까?",
            [
                {text: 'cancel', onPress: () => null},
                {text: 'ok', onPress: this._logout.bind(this)},
            ],
        )
    }

    async _logout(){
        await AsyncStorage.removeItem("userData");
        this.props.navigation.navigate("Loading")
    }

    render() {
        return (
            <Container style={style.container}>
                <Header>
                    <Left>
                        <Icon name="md-person-add" style={{ paddingRight: 10, fontSize: 32 }} />
                    </Left>
                    <Body>
                        <Text>설정</Text>
                    </Body>
                    <Right>
                        <Icon name="ios-menu" style={{ paddingRight: 10, fontSize: 32 }} />
                    </Right>
                </Header>
                <Content>
                    <View style={{ flexDirection: "row", paddingTop: 10 }}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Image source={require("./../../../img/cute.png")} style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
                                    <Text style={{ fontWeight: "bold" }}>Nickname</Text>
                                    <Text>
                                        {this.state.user.name} | {this.state.user.id}{" "}
                                    </Text>
                                    <Text>한동대학교 21800607 | {this.state.user.rc.label} 510호</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Card>
                        <CardItem style={{ height: 50 }}>
                            <Text style={{ fontWeight: "800", fontSize: 18 }}></Text>
                        </CardItem>
                        <CardItem style={{ height: 50 }}>
                            <TouchableOpacity onPress={this._checkLogout.bind(this)}>
                                <Text style={{ fontWeight: "800", fontSize: 18 }}>📌 로그아웃</Text>
                            </TouchableOpacity>
                        </CardItem>
                        <CardItem style={{ height: 50 }}>
                            <Text style={{ fontWeight: "800", fontSize: 18 }}>📌 RC 변경</Text>
                        </CardItem>
                        <CardItem style={{ height: 50 }}>
                            <Text style={{ fontWeight: "800", fontSize: 18 }}>📌 도움말</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}


                

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight,
    }
});