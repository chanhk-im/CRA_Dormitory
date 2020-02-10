import React, { Component } from 'react';

import {StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Text, Image, Button } from 'react-native';
import { Icon, Header, Left, Right, Body, Card, CardItem } from 'native-base';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

export default class SearchScreen extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.textInputView}>
                <Button
                style={styles.textInputButton}
                title="취소"
                onPress={()=>this.props.navigation.goBack()}
                >
                </Button>
                <TextInput
                underlineColorAndroid="transparent"
                placeholder="검색 🔍" 
                style={styles.textInput}
                multiline={true} />
                <Button
                style={styles.textInputButton}
                title="확인"
                onPress={() => {}}/>
            </View>
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
     color:"gray"
    }
  });
