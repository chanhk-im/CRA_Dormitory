import React, { Component } from 'react';

import {StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Text, Image, Button } from 'react-native';
import { Icon, Header, Left, Right, Body, Card, CardItem } from 'native-base';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
    }
  render() {

    return (
        <View style={styles.container}>
            {/* <Header> */}
                {/* <Left> */}
                    {/* <Button
                        style={styles.textInputButton}
                        title="취소"
                        onPress={() => {}}/> */}
                {/* </Left> */}
                {/* <Body>  */}
                    <View style={styles.textInputView}>
                        <Button
                        style={styles.textInputButton}
                        title="취소"
                        onPress={()=>this.props.navigation.goBack()}
                        >
                        </Button>
                        <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        multiline={true} />
                        <Button
                        style={styles.textInputButton}
                        title="확인"
                        onPress={() => {}}/>
                    </View>
                {/* </Body> */}
                {/* <Right> */}
                    {/* <Button
                        style={styles.textInputButton}
                        title="확인"
                        onPress={() => {}}/> */}
                 {/* </Right> */}
            {/* </Header> */}
            {/* <KeyboardAccessoryView alwaysVisible={true}>
                <View style={styles.textInputView}>
                    <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    multiline={true} />
                    <Icon name='ios-send' style={styles.textInputButton}/>
                </View>
                </KeyboardAccessoryView> */}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    textInputView: {
        paddingTop:45,
    //   padding: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInput: {
      flexGrow: 1,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#CCC',
      padding: 10,
      fontSize: 16,
      marginRight: 10,
      textAlignVertical: 'top'
    },
    textInputButton: {
    //   flexShrink: 1,
      color:"gray"
    }
  });