import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, AsyncStorage, Platform } from "react-native";
import { Icon, Container, Content, Header, Left, Right, Body, View } from "native-base";

import PostCardScreen from "./PostCardScreen";
import Loading from "../Loading/Loading";

import { ip, port } from "../../../Secret";
import PTRView from "react-native-pull-to-refresh";

export default class PostScreen extends Component {
    _goWrite() {
        this.props.navigation.navigate("WriteScreen", { addData: this.addData, type: this.props.type, user: this.state.user });
    }

    _goSearch() {
        this.props.navigation.navigate("SearchScreen");
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => <Icon name="ios-paper" style={{ color: tintColor }} />
    };

    state = {
        post: [],
        isLoaded: false,
        user: {},
        cards: []
    };

    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this);
        this.removeData = this.removeData.bind(this);
        this.editData = this.editData.bind(this);
        this.loadDataFromDB = this.loadDataFromDB.bind(this);

        this._refresh = this._refresh.bind(this);
    }

    _refresh() {
        return this.loadDataFromDB();
    }

    async loadDataFromDB() {
        this.setState({
            isLoaded: false
        });

        await fetch(`http://${ip}:${port}/api/posts/type/${this.props.type}`)
            .then(res => res.json())
            .then(resJson => {
                if (resJson !== null) {
                    this.setState({
                        post: resJson
                    });
                }
            });

        AsyncStorage.getItem("userData").then(data => {
            const user = JSON.parse(data || "[]");
            this.setState({ user });
        });
        console.log(this.state.user);
        this.setState({
            isLoaded: true
        });
    }

    componentDidMount() {
        this.loadDataFromDB();
    }

    // [Add a Data]
    addData(data) {
        if (data.title && data.author && data.post) {
            fetch(`http://${ip}:${port}/api/posts`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: data.type,
                    title: data.title,
                    author: data.author,
                    post: data.post,
                    published_date: new Date()
                })
            }).then(() => {
                this.loadDataFromDB();
            });
        }
    }

    // [Remove a Data]
    removeData(id) {
        fetch(`http://${ip}:${port}/api/posts/${id}`, {
            method: "DELETE"
        });

        this.loadDataFromDB();
    }

    // [Update a Data]
    editData(data) {
        fetch(`http://${ip}:${port}/api/posts/${data._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: data.title,
                author: data.author,
                post: data.post,
                published_date: data.published_date
            })
        }).then(() => this.loadDataFromDB());
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <Container style={styles.container}>
                    <Header style={{ backgroundColor: this.props.headerColor }}>
                        <Left>
                            <TouchableOpacity onPress={this._goWrite.bind(this)}>
                                <Icon name="ios-add" style={{ paddingLeft: 10 }} />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Text style={{ color: this.props.textColor }}>{this.props.headerText}</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={this._goSearch.bind(this)}>
                                <Icon name="ios-search" style={{ paddingRight: 10 }} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <PTRView onRefresh={this._refresh}>
                        <Content>
                            <PostCardScreen
                                post={this.state.post}
                                navigation={this.props.navigation}
                                removeData={this.removeData}
                                editData={this.editData}
                                user={this.state.user}
                            />
                        </Content>
                    </PTRView>
                </Container>
            );
        } else {
            return (
                <Container style={styles.container}>
                    <Header style={styles.header}>
                        <Left>
                            <TouchableOpacity onPress={this._goWrite.bind(this)}>
                                <Icon name="ios-add" style={{ paddingLeft: 10 }} />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Text>공지게시판</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={this._goSearch.bind(this)}>
                                <Icon name="ios-search" style={{ paddingRight: 10 }} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Loading />
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight
    }
});
