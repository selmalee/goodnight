import React, { Component } from 'react';
// import { AsyncStorage } from "react-native"
import Stats from './Stats';
import Home from './Home';
// import styles from '../styles/app.style'
import { StackNavigator } from 'react-navigation'

// a route configuration object（一个路由配置对象）
// an options object（一个可选对象）
const RootStack = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Stats: {
      screen: Stats,
    }
  },
  {
    initialRouteName: 'Home',
  }
)

export default class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   loading: true,
    //   username: ''
    // }
    // this.getUsername()
  }

  // async getUsername() {
  //   const value = await AsyncStorage.getItem('username');
  //   this.setState({
  //     username: value,
  //     loading: false
  //   })
  // }

  render() {
    return (
      <RootStack />
    )
  }
}
