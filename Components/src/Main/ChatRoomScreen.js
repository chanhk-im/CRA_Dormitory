import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

export default class ChatRoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {RoomNumber: ''};
    }

    _goChatting = () => {
        this.props.navigation.navigate("ChattingScreen", { Room: this.state.RoomNumber});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.circle}/>
                    <View style={{marginTop: 64}}/>
                    <View style={{marginHorizontal: 32}}>
                        <Text style={styles.header}>Room Number</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType = 'number-pad'
                            placeholder="Room #"
                            onChangeText={data => this.setState({RoomNumber:data})}
                        />
                        <View style={{alignItems: "flex-end", marginTop: 64}}>
                            <TouchableOpacity style={styles.continue} onPress={this._goChatting}>
                                <Ionicons name="md-arrow-round-forward" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7"
  },
  circle: {
      width: 500,
      height: 500,
      borderRadius: 500/ 2,
      backgroundColor: "#FFF",
      position: "absolute",
      left: -120,
      top: -20,  
    },
  header: {
      fontWeight: "800",
      fontSize: 30,
      color: "#514E5A",
      marginTop: 32
  },
  input: {
      marginTop: 32,
      height: 50,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "#BAB7C3",
      borderRadius: 30, 
      paddingHorizontal: 16,
      color: "#514E5a",
      fontWeight: "600"
  },
  continue: {
      width: 70,
      height: 70,
      borderRadius: 70/2,
      backgroundColor: "#00BFFF",
      alignItems: "center",
      justifyContent: "center"
  }
});
