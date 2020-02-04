import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Icon, Header, Left, Right, Body } from 'native-base';

export default class UpdateScreen extends Component {
    state = {
        id: "",
        newTitle: "",
        newAuthor: "",
        newPost: ""
    };

    componentDidMount() {
        let data = this.props.navigation.getParam("data", null);
        console.log(data);
        this.setState({
            id: data.id,
            newTitle: data.title,
            newAuthor: data.author,
            newPost: data.post,
        });
    }

    render() {
        let editData = this.props.navigation.getParam("editData", null);

        return (
            <View style={styles.container}>
                <Header>
                    <Left>
                        <TouchableOpacity 
                            onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='ios-close' style={{ paddingLeft:10 }}/>
                        </TouchableOpacity>
                    </Left>
                    <Body><Text>수정</Text></Body>
                    <Right>
                        <TouchableOpacity
                            onPress={() => {
                                const newData = {
                                    id: this.state.id,
                                    title: this.state.newTitle,
                                    author: this.state.newAuthor,
                                    post: this.state.newPost
                                };

                                editData(newData);
                                this.props.navigation.goBack();
                            }}
                        >
                        <Icon name='ios-checkmark-circle-outline' style={{ paddingRight:10 }}/>
                        </TouchableOpacity>    
                    </Right>
                </Header>
                <View style={styles.contain}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.titleBox}
                        value={this.state.newTitle}
                        placeholder="title"
                        autoCorrect={false}
                        onChangeText={title => this.setState({ newTitle: title })}
                    />
                    <TextInput
                        style={styles.authorBox}
                        value={this.state.newAuthor}
                        placeholder="author"
                        autoCorrect={false}
                        onChangeText={author => this.setState({ newAuthor: author })}
                    />
                </View>
                <View style={styles.body}>
                    <View style={styles.postBox}>
                        <TextInput
                            value={this.state.newPost}
                            placeholder="post"
                            autoCorrect={false}
                            multiline={true}
                            onChangeText={post => this.setState({ newPost: post })}
                        />
                    </View>
                </View>
                </View>
            </View>
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