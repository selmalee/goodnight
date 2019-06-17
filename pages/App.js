import React, { Component } from 'react';
import Stats from './Stats';
import Home from './Home';
import { Image } from 'react-native'
import { TabNavigator } from 'react-navigation'
import iconStats from '../img/icon-stats.png'
import iconHome from '../img/icon-home.png'

// a route configuration object（一个路由配置对象）
// an options object（一个可选对象）
const RootStack = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: '打卡',
        tabBarIcon: () => (
          <Image source={iconHome} />
        )
      }
    },
    Stats: {
      screen: Stats,
      navigationOptions: {
        tabBarLabel: '数据',
        tabBarIcon: () => (
          <Image source={iconStats} />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
	  lazy: true,
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
