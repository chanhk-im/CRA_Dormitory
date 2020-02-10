import React, { Component } from "react";

import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Text, Image, InputAccessoryView, Keyboard } from "react-native";
import { Icon, Header, Left, Right, Body, Card, CardItem, Button } from "native-base";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
//import {KeyboardAccessory} from 'react-native-sticky-keyboard-accessory';
export default class CommentScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.navigation.getParam("data", null);
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" style={{ paddingLeft: 10 }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text>댓글</Text>
                    </Body>
                    <Right>
                        <Icon name="ios-search" style={{ paddingRight: 10 }} />
                    </Right>
                </Header>
                <ScrollView>
                    <View style={styles.content}>
                        <ScrollView>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Image
                                            source={require("./../../../img/cute.png")}
                                            style={{ width: 40, height: 40, borderRadius: 37.5 }}
                                        />
                                        <Body>
                                            <Text style={{ fontWeight: "800" }}>{data.author}</Text>
                                            <Text note>Date</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem style={{ height: 40 }}>
                                    <Text style={{ fontWeight: "800", fontSize: 18 }}>{data.title}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text>{data.post}</Text>
                                </CardItem>
                                <CardItem style={{ height: 50 }}>
                                    <Left>
                                        <Button transparent>
                                            <Icon name="ios-star-outline" style={{ color: "gray" }} />
                                        </Button>
                                        <Button transparent>
                                            <Icon name="ios-chatbubbles" style={{ color: "gray" }} />
                                        </Button>
                                    </Left>
                                </CardItem>
                            </Card>
                        </ScrollView>
                    </View>
                </ScrollView>
                <KeyboardAccessoryView alwaysVisible={true}>
                    <View style={styles.textInputView}>
                        <TextInput underlineColorAndroid="transparent" style={styles.textInput} multiline={true} />
                        <Icon name="ios-send" style={styles.textInputButton} />
                    </View>
                </KeyboardAccessoryView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight
    },
    header: {
        backgroundColor: "#1E90FF"
    },
    textInputView: {
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textInput: {
        flexGrow: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCC",
        padding: 10,
        fontSize: 16,
        marginRight: 10,
        textAlignVertical: "top"
    },
    textInputButton: {
        flexShrink: 1,
        color: "gray"
    }
});
