import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { Card, CardItem, Body, Left, Button, Icon } from "native-base";

import PostCard from "./PostCard";

export default class PostCardScreen extends Component {
    constructor(props) {
        super(props);
        this._checkEdit = this._checkEdit.bind(this);
        this._Edit = this._Edit.bind(this);
        this._checkDelete = this._checkDelete.bind(this);
        this._doComment = this._doComment.bind(this);
        this.state = {
            activeIndex: 0
        };
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

    _checkEdit(data) {
        if (this.props.user.id === data.author) {
            Alert.alert("Edit", "수정하시겠습니까?", [
                { text: "cancel", onPress: () => null },
                { text: "ok", onPress: () => this._Edit(data) }
            ]);
        } 
    }

    _Edit(data) {
        this.props.navigation.navigate("UpdateScreen", {
            data: data,
            editData: this.props.editData
        });
    }

    _checkDelete(data) {
        Alert.alert("Delete", "삭제하시겠습니까?", [
            { text: "cancel", onPress: () => null },
            {
                text: "ok",
                onPress: () => {
                    this.props.removeData(data._id);
                    this.props.navigation.goBack();
                }
            }
        ]);
    }

    _doComment(data) {
        this.props.navigation.navigate("CommentScreen", {
            data: data,
            user: this.props.user
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {this.props.post.map(data => {
                        const date = this._setPostTime(data);
                        return (
                            <PostCard
                                data={data}
                                date={date}
                                user={this.props.user}
                                _checkDelete={this._checkDelete}
                                _checkEdit={this._checkEdit}
                                _Edit={this._Edit}
                                _doComment={this._doComment}
                                key={data._id}
                            />
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    }
});
