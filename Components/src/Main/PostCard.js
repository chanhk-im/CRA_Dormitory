import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { Card, CardItem, Body, Left, Button, Icon } from "native-base";

import { ip, port } from "../../../Secret";

export default class PostCard extends Component {
    state = {
        isAddedStar: false,
    }

    _checkStar(data) {
        return (this.state.isAddedStar || data.stars.filter(star => star.user_id === this.props.user.id).length >= 1) && !(this.state.isAddedStar && data.stars.filter(star => star.user_id === this.props.user.id).length >= 1)
    }

    _onPressStar(data) {
        this.setState({
            isAddedStar: !this.state.isAddedStar
        });

        if (this._checkStar(data)) {
            fetch(`http://${ip}:${port}/api/posts/destar/${data._id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: this.props.user.id
                })
            })
        } else {
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

        
    }

    render() {
        return (
            <Card style={{flex:1}}>
                <CardItem>
                    <Left>
                        <Image source={require("./../../../img/cute.png")} style={{ width: 40, height: 40, borderRadius: 37.5 }} />
                        <Body>
                            <Text style={{ fontSize :16, fontWeight: "bold", fontFamily: "Hoon" }}>{this.props.data.author}</Text>
                            <Text note style={{fontSize :13,fontWeight: "normal",fontFamily: "Oegyein"}}>{this.props.date}</Text>
                        </Body>
                    </Left>
                    {
                        this.props.user.id === this.props.data.author ? 
                        <Button transparent>
                            <TouchableOpacity onPress={() => this.props._checkEdit(this.props.data)}>
                                <Icon name="ios-create" style={{ color: "gray" }} />
                            </TouchableOpacity>
                        </Button> :
                        <View></View>
                    }
                    {
                        (this.props.user.id === this.props.data.author || this.props.user.isAdmin) ?
                            <Button transparent>
                                <TouchableOpacity onPress={() => this.props._checkDelete(this.props.data)}>
                                    <Icon name="ios-close-circle-outline" style={{ color: "gray" }} />
                                </TouchableOpacity>
                            </Button> :
                            <View></View>
                    }
                    
                </CardItem>
                <CardItem style={{ height: 40 }}>
                    <Text style={{ fontWeight: "800", fontSize: 18, fontFamily:"Oegyein" }}>{this.props.data.title}</Text>
                </CardItem>
                <CardItem>
                    <Text ellipsizeMode={"head"} numberOfLines={ 3 } >{this.props.data.post}</Text>
                </CardItem>
                <CardItem style={{ height: 50 }}>
                    <Left>
                        <Button transparent>
                            <TouchableOpacity onPress={() => this._onPressStar(this.props.data)}>
                                {this._checkStar(this.props.data) ? (
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
