import React, { Component } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Image style={{width:100, height:100}}
                    source={require('../images/logo.jpg')}/>
                    
            </View>
        )
    }
}
//<Text style={styles.logoText}>i-dorm </Text>

const styles = StyleSheet.create({
    container: {
      //backgroundColor: 'white',
      flexGrow: 1,
      justifyContent:'flex-end', //그림 센터로 가게
      alignItems: 'center'
      
    },
    logoText :{
        marginVertical:15,
        fontSize:28,
        color: 'rgba(0,0,0,0.5)'
    }
  });