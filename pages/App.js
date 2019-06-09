import React, { Component } from 'react';
import Stats from './Stats';
import Home from './Home';
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
  }

  render() {
    return (
      <RootStack />
    )
  }
}
