import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard  } from "react-native";
import { Icon, Header, Left, Right, Body } from 'native-base';

export default class UpdateScreen extends Component {
    state = {
        _id: "",
        newTitle: "",
        newAuthor: "",
        newPost: ""
    };

    _onPressEmptySpace() {
        Keyboard.dismiss();
    }

    componentDidMount() {
        let data = this.props.navigation.getParam("data", null);
        console.log(data);
        this.setState({
            _id: data._id,
            newTitle: data.title,
            newAuthor: data.author,
            newPost: data.post,
        });

    }

    render() {
        let editData = this.props.navigation.getParam("editData", null);

        return (
            <TouchableWithoutFeedback onPress={this._onPressEmptySpace}>
            <View style={styles.container}>
                <Header style={styles.headerBar}>
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
                                    _id: this.state._id,
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
                        placeholder="  title"
                        autoCorrect={false}
                        onChangeText={title => this.setState({ newTitle: title })}
                    />
                </View>
                <View style={styles.body}>
                    <View style={styles.postBox}>
                        <TextInput
                            value={this.state.newPost}
                            placeholder="  post"
                            autoCorrect={false}
                            multiline={true}
                            onChangeText={post => this.setState({ newPost: post })}
                        />
                    </View>
                </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight
    },
    contain: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    headerBar: {
        backgroundColor: "#1E90FF"
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
        backgroundColor: "white",
        marginTop: 70,
        height: 50,
        width: 360,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        paddingLeft: 20,
    },
    postBox: {
        marginTop: 60,
        width: 360,
        height: 500,
        paddingLeft: 20,
    }
});