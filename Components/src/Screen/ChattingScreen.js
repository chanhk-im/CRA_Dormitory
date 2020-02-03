import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, Platform, Dimensions } from "react-native";
import { Icon, Container, Content, Header, Left, Right, Body } from 'native-base';
const {height,width}=Dimensions.get("window");


export default class ChattingScreen extends Component {
    static navigationOptions = {
        title: '채팅',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-chatboxes' style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <Container style={style.container}>
                <Header>
                    <Left><Icon name='ios-add' style={{ paddingLeft:10 }}/></Left>
                    <Body><Text>채팅</Text></Body>
                    <Right><Icon name='ios-more' style={{ paddingRight:10 }}/></Right>
                </Header>
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