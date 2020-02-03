import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, AsyncStorage, Alert } from "react-native";
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

export default class PostCardScreen extends Component {
    constructor(props) {
        super(props);
        this._checkEdit = this._checkEdit.bind(this);
        this._Edit = this._Edit.bind(this);
        this._checkDelete = this._checkDelete.bind(this);
    }


     _checkEdit(data){
        Alert.alert(
            "Edit",
            "수정하시겠습니까?",
            [
                {text: 'cancel', onPress: () => null},
                {text: 'ok', onPress: () => this._Edit(data)},
            ],
        )
    }

    _Edit(data){
            this.props.navigation.navigate("UpdateScreen", {
            data: data,
            editData: this.props.editData,
        });
    }

    _checkDelete(data){
        Alert.alert(
            "Delete",
            "삭제하시겠습니까?",
            [
                {text: 'cancel', onPress: () => null},
                {text: 'ok', onPress: () => {
                    this.props.removeData(data.id);
                    this.props.navigation.goBack();
                }},
            ],
        )
    }


    render() { 
        return (
            <ScrollView>
                    <View style={styles.container}> 
                        {this.props.post.map(data => {
                            return (
                                <Card>
                                    <CardItem>
                                        <Left>
                                            <Icon name='ios-person'/>
                                            <Body>
                                                <Text style={{ fontWeight:'800'}}>{data.author}</Text>
                                                <Text note>Date</Text>
                                            </Body>
                                        </Left>
                                        <TouchableOpacity
                                            key={data.id}
                                            onPress={() => this._checkEdit(data)}>
                                            <Icon name='ios-create' style={{ color: "black" }}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this._checkDelete(data)}>
                                            <Icon name='ios-close-circle-outline' style={{ color: "black" }}/>
                                        </TouchableOpacity>
                                    </CardItem>
                                    <CardItem style={{ height:40 }}>
                                        <Text style={{ fontWeight:'800', fontSize:18}}>{data.title}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Text>{data.post}</Text>
                                    </CardItem>
                                    <CardItem style={{ height:50 }}>
                                    <Left>   
                                        <Button transparent>
                                            <Icon name='ios-star-outline' style={{ color:"black"}}/>
                                        </Button>
                                        <Button transparent>
                                            <Icon name='ios-chatbubbles' style={{ color:"black"}}/>
                                        </Button>
                                    </Left>
                                    </CardItem>
                                </Card>                         
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
    },
    Titleitem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "#407ddb",
        borderRadius: 5
    },
    postCard: {
        height: 200,
        borderWidth: 1,
        backgroundColor: "#fff",
        margin: 5
    },
    title: {
        fontSize: 25,
        color: "white",
        margin: 2
    },
    author: {
        fontSize: 12,
        width: 100,
        color: "white",
        margin: 2
    },
    post: {
        fontSize: 14
    }
});

