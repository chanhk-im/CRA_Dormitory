import React, { Component } from 'react';
import { StyleSheet, Text,Image , View, TextInput, TouchableOpacity, Alert} from 'react-native';
import PickerBox from 'react-native-picker-box';


export default class SignupScreen extends Component {
    _doLogin(){
        this.props.navigation.replace('LoginScreen');
    }

    _doSignup(){
        this.props.navigation.navigate('SignupScreen');
    }

    _completeSignup(){
        Alert.alert(
            "완료",
            "회원가입이 완료되었습니다",
            [
                {text: 'ok', onPress: () => this.props.navigation.goBack()},
                //{text: 'ok', onPress: () => this._Edit(data)},
            ],
        )
    }

    state={
        data: [
        {label: '토레이 RC', value: '토레이'},
        {label: '장기려 RC', value: '장기려'},
        {label: '손양원 RC', value: '손양원'},
        {label: '카이퍼 RC', value: '카이퍼'},
        {label: '열송학사', value: '열송'},
        {label: 'Carmichael RC', value: 'Carmichael'},
        {label: '해당없음', value: 'x'}
        ],
        selectedValue: '->click'
    }


    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.titleArea}>
                    <Image style={{width:150, height:150}} source={require('./../../../img/hguhouse.jpeg')}/>
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"이름"}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"ID"}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"Password"}
                        secureTextEntry={true}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"이메일 주소"}/>       
                </View>
                
                <Text style={styles.choicetext} >RC를 선택해주세요.</Text>
                <Text style={styles.selectv} onPress={() => this.myref.openPicker() }>{ this.state.selectedValue }</Text>
                <PickerBox style={styles.pickBox}
                    ref={ref => this.myref = ref}
                    data={ this.state.data }
                    onValueChange={value => this.setState({ selectedValue: "->"+value })}
                    selectedValue={ this.state.selectedValue }
                    
                />     

                <TouchableOpacity 
                        style={styles.button}
                        onPress={this._completeSignup.bind(this)}>
                        <Text style={styles.buttonTitle}>회원가입</Text>
                    </TouchableOpacity>
                    <Text style={styles.signupText}>이미 계정이 있습니까? </Text>
                    <TouchableOpacity
                            onPress={this._doLogin.bind(this)}>
                            <Text style={styles.signupButton}> 로그인하기</Text>
                    </TouchableOpacity>
            </View>

        );
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleArea: {
        width: '100%',
        marginTop:20,
        alignItems: 'center',
        margin:40,
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: 300,
        height: 45,
        marginHorizontal:50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        margin:10,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
    },
    logoText :{
        marginVertical:15,
        fontSize:28,
        color: 'rgba(0,0,0,0.5)'
    },
    inputBox: {
        width:300,
        height:50,
        borderBottomWidth: 2,
        marginBottom:10,
        borderBottomColor:'rgba(183,188,193,0.4)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize:16,
        color:'black',
        marginVertical:5,
    },
    button: {
        width: 300,
        backgroundColor:'rgb(6,44,101)',
        borderRadius: 15,
        marginVertical:15,
        paddingVertical:12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color: 'white',
        textAlign: 'center'
    },
    choicetext:{
        width:270,
        fontSize: 16,
        marginVertical:5,
        fontWeight:'400',
        marginBottom:3,
                
    },
    selectv: {
        width:300,
        height:20,
        marginBottom:10,
        paddingHorizontal: 16,
       
        
    },
    pickBox:{
        fontSize:16 ,
        backgroundColor:'blue'
        
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
      },
    

  });