import React, { Component } from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Container, Content, Icon, Header, Item, Input, Button } from "native-base";

import { ip, port } from "../../../Secret";

import PostCardScreen from "./PostCardScreen";
import Loading from "../Loading/Loading";

export default class SearchScreen extends Component {
    // _handleKeyPress = (e) => {
    //   if(e.charCode === 13){
    //   this._buttonClick();
    //   }
    // }

    state = {
        search: "",
        searchPosts: [],
        isLoaded: true
    };

    _onPressSearch(type) {
        let search = this.state.search;
        this.setState({
            isLoaded: false
        });

        fetch(`http://${ip}:${port}/api/posts/search/${type}/${search}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    searchPosts: res,
                    isLoaded: true
                });
            });
    }

    render() {
        const removeData = this.props.navigation.getParam("removeData", null);
        const editData = this.props.navigation.getParam("editData", null);
        const user = this.props.navigation.getParam("user", null);
        const type = this.props.navigation.getParam("type", null);

        if (this.state.isLoaded) {
            return (
                <Container style={styles.container}>
                    <Header searchBar rounded style={styles.headerBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-close" style={{ padding: 10 }} />
                        </TouchableOpacity>

                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="글 제목, 내용" onChangeText={text => this.setState({ search: text })} />
                        </Item>

                        <TouchableOpacity style={styles.textInputButton_s} onPress={() => this._onPressSearch(type)}>
                            <Text style={styles.searchText}>Search</Text>
                        </TouchableOpacity>
                    </Header>
                    <Content>
                        <PostCardScreen
                            post={this.state.searchPosts}
                            navigation={this.props.navigation}
                            removeData={removeData}
                            editData={editData}
                            user={user}
                        />
                    </Content>
                </Container>
            );
        } else {
            return (
                <Container style={styles.container}>
                    <Header searchBar rounded style={styles.headerBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-close" style={{ padding: 10 }} />
                        </TouchableOpacity>

                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="글 제목, 내용" onChangeText={text => this.setState({ search: text })} />
                        </Item>

                        <TouchableOpacity style={styles.textInputButton_s} onPress={() => this._onPressSearch}>
                            <Text style={styles.searchText}>Search</Text>
                        </TouchableOpacity>
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
    },
    headerBar: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    textInputButton_c: {
        paddingLeft: 0.0001,
        width: 61
    },
    searchText: {
        color: "skyblue",
        fontWeight: "bold"
    },
    textInputButton_s: {
        paddingLeft: 15,
        width: 71.6
    }
});
