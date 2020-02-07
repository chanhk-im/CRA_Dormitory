import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { Card, CardItem, Body, Left, Button, Icon } from "native-base";

import { ip, port } from "../../../Secret";

export default class PostCard extends Component {
    state = {
        isAddedStar: false,
    }

    _checkStar(data) {
        if (data.stars.filter(star => star.user_id === this.props.user.id).length >= 1) {
            console.log(1);
            this.setState({
                isAddedStar: true,
            })
        }
    }

    _onPressStar(data) {
        this.setState({
            isAddedStar: !this.state.isAddedStar
        });

        fetch(`http://${ip}:${port}/api/posts/star/${data._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: this.props.user.id
            })
        })
    }

    async componentDidMount() {
        await this._checkStar(this.props.data);
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Image source={require("./../../../img/cute.png")} style={{ width: 40, height: 40, borderRadius: 37.5 }} />
                        <Body>
                            <Text style={{ fontWeight: "800" }}>{this.props.data.author}</Text>
                            <Text note>{this.props.date}</Text>
                        </Body>
                    </Left>
                    <Button transparent>
                        <TouchableOpacity onPress={() => this.props._checkEdit(this.props.data)}>
                            <Icon name="ios-create" style={{ color: "grey" }} />
                        </TouchableOpacity>
                    </Button>
                    <Button transparent>
                        <TouchableOpacity onPress={() => this.props._checkDelete(this.props.data)}>
                            <Icon name="ios-close-circle-outline" style={{ color: "grey" }} />
                        </TouchableOpacity>
                    </Button>
                </CardItem>
                <CardItem style={{ height: 40 }}>
                    <Text style={{ fontWeight: "800", fontSize: 18 }}>{this.props.data.title}</Text>
                </CardItem>
                <CardItem>
                    <Text>{this.props.data.post}</Text>
                </CardItem>
                <CardItem style={{ height: 50 }}>
                    <Left>
                        <Button transparent>
                            <TouchableOpacity onPress={() => this._onPressStar(this.props.data)}>
                                {this.state.isAddedStar ? (
                                    <Icon name="ios-star" style={{ color: "#ebc034" }} />
                                ) : (
                                    <Icon name="ios-star-outline" style={{ color: "gray" }} />
                                )}
                            </TouchableOpacity>
                        </Button>
                        <Button transparent>
                            <TouchableOpacity onPress={() => this.props._doComment(this.props.data)}>
                                <Icon name="ios-chatbubbles" style={{ color: "gray" }} />
                            </TouchableOpacity>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}
