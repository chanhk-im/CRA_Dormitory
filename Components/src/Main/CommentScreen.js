import React, { Component } from "react";

import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Text, Image, Keyboard, KeyboardAvoidingView } from "react-native";
import { Icon, Header, Left, Right, Body, Card, CardItem, Button } from "native-base";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import Loading from "../Loading/Loading";

import { ip, port } from "../../../Secret";
export default class CommentScreen extends Component {
    state = {
        comment: "",
        comments: [],
        isLoaded: false
    };

    // constructor(props) {
    //     super(props);
    // }

    _onPressComment(data) {
        let user = this.props.navigation.getParam("user", null);
        let comment = {
            author: user.id,
            comment: this.state.comment,
            published_date: Date.now()
        };
        fetch(`http://${ip}:${port}/api/posts/comment/${data._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }).then(() => {
            this.state.comments.push(comment);

            this.setState({
                comment: ""
            });
        });
    }

    _loadData() {
        this.setState({
            isLoaded: false
        });

        let data = this.props.navigation.getParam("data", null);
        this.setState({
            comments: data.comments,
            isLoaded: true
        });
    }

    _setPostTime(data) {
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();

        const postTime = new Date(data.published_date);
        console.log(Date.now() - data.published_date);

        const post =
            postTime.getMonth() +
            1 +
            "월 " +
            postTime.getDate() +
            "일 " +
            (postTime.getHours() < 10 ? "0" + postTime.getHours() : postTime.getHours()) +
            ":" +
            (postTime.getMinutes() < 10 ? "0" + postTime.getMinutes() : postTime.getMinutes());

        return post;
    }

    componentDidMount() {
        this._loadData();
    }

    render() {
        let data = this.props.navigation.getParam("data", null);
        if (this.state.isLoaded) {
            return (
                <View style={styles.container}>
                    <Header style={styles.header}>
                        <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Icon name="ios-arrow-back" style={{ paddingLeft: 10 }} />
                            </TouchableOpacity>
                        </Left>
                        <Body />
                        <Right />
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
                        <View style={{ flex: 1 }}>
                            {
                                this.state.comments.map(data => {
                                    return (
                                        // <Card>
                                        <View style={styles.container}>
                                            <CardItem>
                                                <Left>
                                                    <Image
                                                        source={require("./../../../img/cute.png")}
                                                        style={{ width: 28, height: 28, borderRadius: 37.5 }}
                                                    />
                                                    <Body>
                                                        <Text style={{fontWeight:"bold"}}>{data.author}</Text>
                                                        <Text style={{fontSize:12}}>{this._setPostTime(data)}</Text>
                                                    </Body>
                                                </Left>
                                                    <Button transparent>
                                                        <TouchableOpacity onPress={() => this.props._checkDelete(this.props.data)}>
                                                            <Icon name="ios-close-circle-outline" style={{ color: "gray" }} />
                                                        </TouchableOpacity>
                                                    </Button> 
                                            </CardItem>
                                            <CardItem>
                                                <Text>{data.comment}</Text>
                                            </CardItem>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    <KeyboardAccessoryView alwaysVisible={true}>
                        <View style={styles.textInputView}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={styles.textInput}
                                multiline={true}
                                value={this.state.comment}
                                onChangeText={text => this.setState({ comment: text })}
                            />
                            <TouchableOpacity onPress={() => this._onPressComment(data)}>
                                <Icon name="ios-send" style={styles.textInputButton} />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAccessoryView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Header style={styles.header}>
                        <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Icon name="ios-arrow-back" style={{ paddingLeft: 10 }} />
                            </TouchableOpacity>
                        </Left>
                        <Body />
                        <Right />
                    </Header>
                    <Loading />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight
    },
    header: {
        backgroundColor: "#719FE5"
    },
    content: {
        flex: 1,
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
