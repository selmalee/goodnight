import React, { Component } from 'react';
import Stats from './Stats';
import New from './New';
import Home from './Home';
import { Image } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import iconStats from '../img/icon-stats.png'
import iconHome from '../img/icon-home.png'
import styles from '../styles/app.style'

// a route configuration object（一个路由配置对象）
// an options object（一个可选对象）
const StatsStack = StackNavigator({
  Stats: { screen: Stats },
  New: { screen: New }
})
const RootTabs = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: '打卡',
        tabBarIcon: () => (
          <Image style={styles.tabBarIcon} source={iconHome} />
        )
      }
    },
    Stats: {
      screen: StatsStack,
      navigationOptions: {
        tabBarLabel: '数据',
        tabBarIcon: () => (
          <Image style={styles.tabBarIcon} source={iconStats} />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
	  lazy: true,
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      resetOnBlur: true
    }
  }
)

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RootTabs />
    )
  }
}
