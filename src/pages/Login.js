import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';


export default class Login extends Component {
    render(){
        return(
            <View style={styles.container}> 
               <Logo/>
               <Form type="Login"/>
               <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet? </Text>
                    <Text style={styles.signupButton}> Signup</Text>
               </View>
            </View>

        )
    }
}

const styles =  StyleSheet.create({
    container: {
      backgroundColor: 'white', //이건 그림 넣는 그 세로 색
      flex: 1,
      //flexDirection: 'column',
      //alignItems:'stretch',
      alignItems: 'center',
      justifyContent: 'center'
    },
    signupTextCont : {
      flexGrow: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical:30,
      flexDirection: 'row',
    },
    signupText : {
        color: 'gray',
        fontSize: 16,
    },
    signupButton : {
        color:'rgba(255,0,0,0.4)',
        fontSize:17,
        fontWeight:'500'
    }
  });