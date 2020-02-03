import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, TextInput, StatusBar, Platform, Dimensions } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { Icon, Container, Content, Header, Left, Right, Body } from 'native-base';
const {height,width}=Dimensions.get("window");

import PostCardScreen from "./../PostCard/PostCardScreen";


export default class RcSonScreen extends Component {
    _navigate(){
        this.props.navigation.navigate('WriteScreen',  { addData: this.addData, type: "RcSon"  });
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-paper' style={{ color: tintColor }} />
        ),
    }

    state={
        post:[]
    };

    constructor(props){
        super(props);
        this.addData = this.addData.bind(this);
        this.removeData = this.removeData.bind(this);
        this.editData = this.editData.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem("Posts").then(data => {
            const post = JSON.parse(data || '[]');
            this.setState({ post });
        })
    }

    addData(data) {
        this.setState(prevState => {
            const post = [
                data,
                ...prevState.post
            ]
            AsyncStorage.setItem("Posts", JSON.stringify(post));
            return ({ post })
        });

    }

    removeData(id) {
        let post = this.state.post;
        const index = post.findIndex(e => e.id === id);

        post.splice(index, 1);

        this.setState({
            post: post
        })
        AsyncStorage.setItem("Posts", JSON.stringify(post));
    }

    editData(data) {
        let post = this.state.post;
        const index = post.findIndex(e => e.id === data.id);

        this.state.post[index] = data;

        this.setState({
            post: post
        })
        AsyncStorage.setItem("Posts", JSON.stringify(post));
    }


    render() {
        return (
            <Container style={style.container}>
                <Header>
                    <Left>
                        <TouchableOpacity
                            onPress={this._navigate.bind(this)}>
                             <Icon name='ios-add' style={{ paddingLeft:10 }}/>
                        </TouchableOpacity>
                        </Left>
                    <Body><Text>손양원 RC게시판</Text></Body>
                    <Right><Icon name='ios-search' style={{ paddingRight:10 }}/></Right>
                </Header>
                <Content>
                <PostCardScreen post={this.state.post} navigation={this.props.navigation} removeData={this.removeData} editData={this.editData}/>                    
                </Content>
            </Container>
        );
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight,
    },
    Header:{
        backgroundColor: "#3ED0C8"
    }
});
