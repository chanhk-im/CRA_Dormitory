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
        isLoaded: false,
        headerColor: ""
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

    _onPressDelete(post, data) {
        const comments = this.state.comments
        const index = comments.findIndex(e => e._id === data._id);

        comments.splice(index, 1);
        this.setState({
            comments
        });

        fetch(`http://${ip}:${port}/api/posts/decomment/${post._id}/`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment_id: data._id,
            })
        })
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
        const headerColor = this.props.navigation.getParam("headerColor", "");
        this.setState({
            headerColor
        });
    }

    render() {
        const post = this.props.navigation.getParam("data", null);
        const date = this._setPostTime(post);
        const user = this.props.navigation.getParam("user", null);

        if (this.state.isLoaded) {
            return (
                <View style={ styles.container }>
                    <Header style={{ backgroundColor: this.state.headerColor }}>
                        <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>              
                                <Icon name="ios-arrow-back" style={{ paddingLeft: 10 }} />
                            </TouchableOpacity>
                        </Left>
                        <Body />
                        <Right />
                    </Header>
                    <ScrollView  keyboardDismissMode='on-drag'> 
                        <View style={ styles.content }>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Image
                                            source={require("./../../../img/cute.png")}
                                            style={{ width: 40, height: 40, borderRadius: 37.5 }}
                                        />
                                        <Body>
                                            <Text style={{ fontSize :16, fontWeight: "bold",  fontFamily: "Hoon" }}>{data.author}</Text>
                                            <Text note  style={{fontSize :13,fontWeight: "normal",fontFamily: "Oegyein"}}>Date</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem style={{ height: 40 }}>
                                    <Text style={{ fontWeight: "800", fontSize: 18, fontFamily:"Oegyein" }}>{data.title}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={{fontFamily:"Oegyein"}}>{data.post}</Text>
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
                        </View>
                        <View style={{ flex: 1 }}>
                            {this.state.comments.map(data => {
                                return (
                                    // <Card>
                                    <View style={ styles.container } key={ data.published_date }>
                                        <CardItem>
                                            <Left>
                                                <Image
                                                    source={require("./../../../img/cute.png")}
                                                    style={{ width: 28, height: 28, borderRadius: 37.5 }}
                                                />
                                                <Body>
                                                    <Text style={{ fontSize : 15, fontWeight: "bold", fontFamily: "Hoon" }}>{data.author}</Text>
                                                    <Text style={{ fontSize: 12, fontFamily: "Oegyein" }}>{this._setPostTime(data)}</Text>
                                                </Body>
                                            </Left>
                                            {
                                                data.author === user.id ? 
                                                <Button transparent onPress={() => this._onPressDelete(post, data)}>
                                                    <Icon name="ios-close-circle-outline" style={{ color: "gray" }} />
                                                </Button> :
                                                <View></View>
                                            }
                                        </CardItem>
                                        <CardItem>
                                            <Text style={{fontFamily: "Oegyein"}}>{data.comment}</Text>
                                        </CardItem>
                                    </View>
                                );
                            })}
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
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.comment) {
                                        this._onPressComment(post);
                                    }
                                }}
                            >
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
    content: {
        flex: 1
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
