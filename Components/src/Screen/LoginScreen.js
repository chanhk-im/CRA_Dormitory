import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, 
    Image
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class LoginScreen extends Component{
    
    static navigationOptions = {
        headerShown:false,
    };

    _doLogin(){
        this.props.navigation.navigate('TabNavigator');
    }

    _doSignup(){
        this.props.navigation.navigate('SignupScreen');
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Image style={{width:150, height:150}} source={require('./../../../img/hguhouse.jpeg')}/>
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"ID"}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"Password"}/>
                </View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this._doLogin.bind(this)}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.signupText}>아직 계정이 없습니까? </Text>
                    <TouchableOpacity
                            onPress={this._doSignup.bind(this)}>
                            <Text style={styles.signupButton}> 회원가입</Text>
                    </TouchableOpacity>

                </View>

        );
    }
}

const styles = StyleSheet.create({
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
    formArea: {
        width: '100%',
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
    button: {
        backgroundColor: "#1E3269",
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin:20,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
    },
    buttonTitle: {
        color: 'white',
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
          fontSize: 20,
          marginTop: 100,
      },
      signupButton : {
          margin:20,
          color:'rgba(255,0,0,0.4)',
          fontSize:20,
          fontWeight:'500'
      },
})