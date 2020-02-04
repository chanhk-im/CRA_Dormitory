import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, Platform, Dimensions, Image } from "react-native";
import { Icon, Container, Content, Header, Left, Right, Body } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
const {height,width}=Dimensions.get("window");

export default class RcScreen extends Component {
    _navigate1(){
        this.props.navigation.navigate('RcTorScreen');
    }
    _navigate2(){
        this.props.navigation.navigate('RcKuyScreen');
    }
    _navigate3(){
        this.props.navigation.navigate('RcSonScreen');
    }
    _navigate4(){
        this.props.navigation.navigate('RcPhiScreen');
    }
    _navigate5(){
        this.props.navigation.navigate('RcCarScreen');
    }
    _navigate6(){
        this.props.navigation.navigate('RcJanScreen');
    }

    static navigationOptions = {
        title: 'RC게시판',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-paper' style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.left}>
                        <TouchableOpacity
                            style={styles.leftTop}
                            onPress={this._navigate1.bind(this)}>
                            <Image source={require('./../../../img/Torrey.jpg')} style={{width:220, height:230}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.leftCenter}
                            onPress={this._navigate2.bind(this)}>
                            <Image source={require('./../../../img/Kuyper.jpg')} style={{width:220, height:200}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.leftBottom}
                            onPress={this._navigate3.bind(this)}>
                            <Image source={require('./../../../img/Sonyangwon.jpg')} style={{width:220, height:220}}/>
                        </TouchableOpacity>
                    </View>  
                    <View style={styles.right}>  
                        <TouchableOpacity
                            style={styles.rightTop}
                            onPress={this._navigate4.bind(this)}>
                            <Image source={require('./../../../img/Philadelphos.jpg')} style={{width:220, height:200}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rightCenter}
                            onPress={this._navigate5.bind(this)}>
                            <Image source={require('./../../../img/Carmichael.jpg')} style={{width:220, height:200}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rightBottom}
                            onPress={this._navigate6.bind(this)}>
                            <Image source={require('./../../../img/Jangkiryeo.jpg')} style={{width:220, height:200}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}


  
  

  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight,
        marginTop : 90
    },
    body: {
      flex: 1,
      flexDirection: 'row',
    },
    left: {
      flex: 1,
      flexDirection: 'column',
    },
    leftTop: {
      flex: 1,
    },
    leftCenter: {
      flex: 1,
    },
    leftBottom: {
      flex: 1,
    },
    right: {
      flex: 1,
      flexDirection: 'column',
    },
    rightTop: {
      flex: 1,
    },
    rightCenter: {
      flex: 1,
    },
    rightBottom: {
      flex: 1,
    },
  });