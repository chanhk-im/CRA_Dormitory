import React, { Component } from 'react';

import {StyleSheet, } from 'react-native';
import { Container, Icon, Header,Item,Input, Button, Text,} from 'native-base';


export default class SearchScreen extends Component {
  // _handleKeyPress = (e) => {
  //   if(e.charCode === 13){
  //   this._buttonClick();
  //   }
  // }
  render() {
    return (
        <Container>
          <Header searchBar rounded>
            <Button transparent  onPress={()=>this.props.navigation.goBack()} >
              <Text style={styles.textInputButton_c}>Cancel</Text>
            </Button>
            
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="글 제목, 내용"/>
               {/* //onKeyPress={this._handleKeyPress}/> */}
            </Item>
            
            <Button transparent style={styles.textInputButton_s}>
              <Text>Search</Text>
            </Button>      
          </Header>
          </Container>
           );
             }
           }

  const styles = StyleSheet.create({
        
        textInputButton_c: {
          paddingLeft: 0.0001, 
          width:61,
        },
        textInputButton_s: {
          paddingLeft: 0.01, 
          width:71.6,
        }
      });