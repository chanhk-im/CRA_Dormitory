import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Picker } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Icon, Header, Left, Right, Body } from 'native-base';


export default class ChattingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, date:"9:50 am", type:'in',  message: "전화는 밖에서 부탁드립니다"},
        {id:2, date:"9:51 am", type:'out', message: "넵, 죄송합니다"} ,
        {id:3, date:"9:53 am", type:'in', message: "감사합니다"} ,
      ]
    };
  }
  state = {message: ''}
   
   updateMessage = message => {
      this.setState({ message: message })
   }

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

render() {
    return (
        <View style={styles.container}>
            <Header style={ styles.header }>
                    <Left><Icon name='ios-add' style={{ paddingLeft:10 }}/></Left>
                    <Body><Text>채팅</Text></Body>
                    <Right><Icon name='ios-more' style={{ paddingRight:10 }}/></Right>               
            </Header>

            <ScrollView >
                <FlatList style={styles.list}
                    data={this.state.data}
                    keyExtractor= {(item) => {
                        return item.id;
                    }}
                    renderItem={(message) => {
                        console.log(item);
                        const item = message.item;
                        let inMessage = item.type === 'in';
                        let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                        return (
                            <View style={[styles.item, itemStyle]}>
                                {!inMessage && this.renderDate(item.date)}
                                <View style={[styles.balloon]}>
                                    <Text>{item.message}</Text>
                                </View>
                                {inMessage && this.renderDate(item.date)}
                            </View>
                        )
                }}/>
            </ScrollView>

            <View style={styles.send}>
                <Picker selectedValue = {this.state.message} onValueChange = {this.updateMessage}>
                <Picker.Item label = "조금 조용히 얘기해주세요" value = "조금 조용히 얘기해주세요" />
                <Picker.Item label = "전화는 밖에서 부탁드립니다" value = "전화는 밖에서 부탁드립니다" />
                <Picker.Item label = "발소리 조금만 줄여주세요" value = "발소리 조금만 줄여주세요" />
                <Picker.Item label = "새벽에 샤워는 자제해주세요" value = "새벽에 샤워는 자제해주세요" />
                <Picker.Item label = "넵, 죄송합니다" value = "넵, 죄송합니다" />
                <Picker.Item label = "감사합니다" value = "감사합니다" />
                </Picker>         
                <Text style = {styles.text}>{this.state.message}</Text>
                <View style={styles.header2}>
                    <View style={styles.item2}>
                        <TouchableOpacity style={styles.btnSend}>
                            <FontAwesome name= 'send-o' size={30} color='#fff' onPress={() => SendHandler(message)}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight,
    },
    header: { 
        backgroundColor: "#A7DEFE",
    },
    send: {
        backgroundColor: '#abc',
        height:270,
    },
    head: {
        height: 80,
        backgroundColor: '#4682B4',
    },
    item: {
        padding: 16,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    list:{
        paddingHorizontal: 17,
    },
    iconSend:{
        width:30,
        height:30,
        alignSelf:'center',
    },
    balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
    },
    itemIn: {
        alignSelf: 'flex-start'
    },
    itemOut: {
        alignSelf: 'flex-end'
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize:12,
        color:"#808080",
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor:"#eeeeee",
        borderRadius:300,
        padding:5,
    },
    text: {
        fontSize: 25,
        alignSelf: 'center',
        color: 'black'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        marginRight:10,
    },
    header2: {
        height: 80,
    },
    item2: {
        padding: 10,
        margin: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    btnSend:{
        backgroundColor:"#00BFFF",
        width:40,
        height:40,
        borderRadius:360,
        alignItems:'center',
        justifyContent:'center',
    },
});

