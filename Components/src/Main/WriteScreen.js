import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions,ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Icon, Header, Left, Right, Body } from 'native-base';

export default class WriteScreen extends Component {
    state = {
        newTitle: "",
        newAuthor: "",
        newPost: "",
        keyboard: false
    };
    //const screenHeight = Math.round(Dimensions.get('window').height);

    _onPressEmptySpace = () => {
        Keyboard.dismiss();
        this.setState({
          keyboard: false
        });
      }

    render() {
        let addData = this.props.navigation.getParam("addData", null);
        let type = this.props.navigation.getParam("type", null);
        let user = this.props.navigation.getParam("user", null);
        let placeHolder = `  여기를 눌러 글을 작성할 수 있습니다. 
  아래 내용을 모두 지켜 깨끗한 i - DORM을 만듭시다 ღ ̈ღ
       
 _타인 또는 특정 단체에 대한 욕설, 악담, 비방, 비하, 비아냥 X
 _도배성 글 금지`
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
                    <Body><Text>글 쓰기</Text></Body>
                    <Right>
                        <TouchableOpacity
                            onPress={() => {
                                const newData = {
                                    type: type,
                                    title: this.state.newTitle,
                                    author: user.id,
                                    post: this.state.newPost,
                                };
                                addData(newData);
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
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 0.5,
        paddingLeft: 20,
        fontSize:20,
    },
    postBox: {
        marginTop: 60,
        width: 360,
        height: 500,
        paddingLeft: 20,
        fontSize:20,

    }
});
