import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import MainScreen from './Components/MainScreen';


// class RcScreen extends Component{
//   render() {
//     return (
//       <View>
//         <Text>HI</Text>
//       </View>
//     );
//   }
// }

export default class App extends Component {
  render() {
    return <MainScreen/>;
  }
}


// //Create a Component
// const App = () => (
//   <MainScreen />
// );

// //Export App - This line solved my issue
// export default App;

// //Render it to the device
// //AppRegistry.registerComponent('HguRcApp_s+t', () => App);
// //albums is project name that we use while creating RN App