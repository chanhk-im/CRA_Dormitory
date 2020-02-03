import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, AsyncStorage, Alert } from "react-native";
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

export default class CommentScreen extends Component {
    constructor(props) {
        super(props);
        // this._checkEdit = this._checkEdit.bind(this);
        // this._Edit = this._Edit.bind(this);
        // this._checkDelete = this._checkDelete.bind(this);
    }

    // componentDidMount() {
    //     let data = this.props.navigation.getParam("data", null);
    //     this.setState({
    //         id: data.id,
    //         oriTitle: data.title,
    //         oriAuthor: data.author,
    //         oriPost: data.post,
    //     });
    // }

    render() {
        let addData = this.props.navigation.getParam("addData", null);
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
                                    
                                    <Icon name='ios-create' style={{ color: "black" }}/>
                                    <Icon name='ios-close-circle-outline' style={{ color: "black" }}/>
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
        backgroundColor: "#fff",
    },
    contain: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttons: {
        height: 60,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    titleBox: {
        backgroundColor:"white",
        marginTop:70,
        height: 50,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        marginHorizontal: 5,
    },
    authorBox: {
        backgroundColor:"white",
        marginTop:70,
        height: 50,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        marginHorizontal: 5,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        
    },
    postBox: {
        //flex: 1,
        marginTop: 60,
        width: 380,
        height:500,
        borderWidth: 0.5,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
    },
});