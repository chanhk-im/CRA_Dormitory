import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableOpacityBase} from 'react-native';
//import { apisAreAvailable } from 'expo';

export default class Form extends Component {
/*
    constructor(props){
        super(props)
    }
*/
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                //underlineColorAndroid='pink'
                 placeholder='Email' 
                 placeholderTextColor='black'/>

               <TextInput style={styles.inputBox}
                //underlineColorAndroid='pink'
                 placeholder='ID' 
                 placeholderTextColor='black'/>
                             

                <TextInput style={styles.inputBox}
                //underlineColorAndroid='pink'
                 placeholder='Nickname' 
                 secureTextEntry={true}
                 placeholderTextColor='black'
                 />  

                <TextInput style={styles.inputBox}
                //underlineColorAndroid='pink'
                 placeholder='Password' 
                 secureTextEntry={true}
                 placeholderTextColor='black'
                 />         

                 <TouchableOpacity style={styles.button}>
                     <Text style={styles.buttonText}>{this.props.type}</Text>
                 </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      //backgroundColor: 'white',
      //flex: 1,// 아래로 내려감
      flexGrow: 1,// 로고 위로 올라감
      justifyContent:'center', //그림 센터로 가게
      alignItems: 'center',
     
      //textDecorationLine: 'underline'

      
    },
    inputBox: {
        width:300,
        height:50,
        //backgroundColor:'skyblue',
        borderBottomWidth: 2,
        marginBottom:10,
        borderBottomColor:'rgba(183,188,193,0.4)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize:16,
        color:'black',
        marginVertical:5,
        
        //textDecorationLine: 'underline',
        
    },
    button: {
        width: 300,
        backgroundColor:'rgb(6,44,101)',
        borderRadius: 15,
        marginVertical:15,
        paddingVertical:12
    },

    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color: 'white',
        textAlign: 'center'
    }
    
  });