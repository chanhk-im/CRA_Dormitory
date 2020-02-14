import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, AsyncStorage } from "react-native";
import { Card, CardItem, Icon, Container, Content, Header, Left, Right, Body } from "native-base";
import * as Font from 'expo-font'

export default class SettingScreen extends Component { 
    static navigationOptions = {
        title: "설정",
        tabBarIcon: ({ tintColor }) => <Icon name="ios-settings" style={{ color: tintColor }} />
    };

    state = {
        user: {},
        isLoaded: false,
        fontLoaded: false,
    };

    async componentDidMount() {
        await AsyncStorage.getItem("userData").then(data => {
            const user = JSON.parse(data || "[]");
            this.setState({
                user,
                isLoaded: true,
                fontLoaded: true
            });
        });
        await Font.loadAsync({
            'Oegyein': require('./../../../assets/fonts/Oegyein.ttf'),
        });

    }

    _checkLogout() {
        Alert.alert("Logout", "로그아웃 하시겠습니까?", [
            { text: "cancel", onPress: () => null },
            { text: "ok", onPress: this._logout.bind(this) }
        ]);
    }

    async _logout() {
        await AsyncStorage.removeItem("userData");
        this.props.navigation.navigate("Loading");
    }

    render() {
        console.log(this.state.user);
        if (this.state.isLoaded && this.state.fontLoaded) {
            return (
                <Container style={styles.container}>
                    <Header style={styles.header}>
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
                                        <Text style={{ fontFamily: 'Hoon', fontWeight: "bold" }}>Nickname</Text>
                                        <Text style={{fontFamily: 'Oegyein'}}>
                                            {this.state.user.name} | {this.state.user.id}{" "}
                                        </Text>
                                        <Text style={{fontFamily: 'Oegyein'}}>{this.state.user.email} | {this.state.user.rc.label}, {this.state.user.room}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Card>
                            <CardItem style={{ height: 50, marginTop: 5 }}>
                                <TouchableOpacity onPress={this._checkLogout.bind(this)}>
                                            <Text style={{ fontFamily: 'Oegyein', fontWeight: "800", fontSize: 18}}>📌     로그아웃</Text>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem style={{ height: 50 }}>
                                <TouchableOpacity>
                                <Text style={{ fontFamily: 'Oegyein', fontWeight: "800", fontSize: 18 }}>📌     RC 변경</Text>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem style={{ height: 50 }}>
                                <TouchableOpacity>
                                <Text style={{ fontFamily: 'Oegyein', fontWeight: "800", fontSize: 18 }}>📌     도움말</Text>
                                </TouchableOpacity>
                            </CardItem>

                        </Card>
                    </Content>
                </Container>
            );
        } else{
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight
    },
    header: {
        backgroundColor: "#A7DEFE"
    }
});
