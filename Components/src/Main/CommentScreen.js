import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, AsyncStorage, Platform } from "react-native";
import { Icon, Container, Content, Header, Left, Right, Body, Card, CardItem, Button  } from 'native-base';

export default class CommentScreen extends Component {

    render() {
        let data = this.props.navigation.getParam("data", null);

        return (
            <Container style={style.container}>
            <Header>
                <Left>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.goBack()}>
                        <Icon name='ios-arrow-back' style={{ paddingLeft:10 }}/>
                    </TouchableOpacity>
                    </Left>
                <Body><Text>댓글</Text></Body>
                <Right>
                    <Icon name='ios-add' style={{ paddingRight:10 }}/>
                </Right>
            </Header>
            <Content>
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
            </Content>
        </Container>
    );
}
}


const style = StyleSheet.create({
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