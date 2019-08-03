import React, { Component } from 'react';
import Home from './Home';
import Stats from './Stats';
// import Week from './Week';
import { Image, AppState, AsyncStorage } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import iconStats from '../img/stats.png'
import iconHome from '../img/home.png'
import styles, { primaryColor, defaultColor } from '../styles/app.style'

import store from '../store';
import { Provider } from 'react-redux'
import { initList } from '../action';

// a route configuration object（一个路由配置对象）
// an options object（一个可选对象）
const StatsStack = StackNavigator({
  Stats: { 
    screen: Stats,
    navigationOptions: ({ navigation }) => ({
      title: '历史数据',
    })
  },
  // Week: {
  //   screen: Week,
  //   navigationOptions: ({ navigation }) => ({
  //     title: '本周',
  //   })
  // },
})
const RootTabs = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: '打卡',
        tabBarIcon: ({tintColor}) => (
          <Image style={[styles.tabBarIcon, {tintColor: tintColor}]} source={iconHome} />
        )
      }
    },
    Stats: {
      screen: StatsStack,
      navigationOptions: {
        tabBarLabel: '数据',
        tabBarIcon: ({tintColor}) => (
          <Image style={[styles.tabBarIcon, {tintColor: tintColor}]} source={iconStats} />
        ),
        // tabBarOnPress: ({scene, jumpToIndex}) => {
        //   // console.log(scene)
        //   jumpToIndex(scene.index)
        //   // this.props.navigation.navigate('Stats')
        // }
      }
    }
  },
  {
    tabBarPosition: 'bottom',
	  lazy: true,
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: primaryColor,
      inactiveTintColor: defaultColor,
      resetOnBlur: true,
      tabBarColor: primaryColor
    }
  }
)

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  // 组件mount时获取缓存数据
  componentDidMount() {
    console.log('mount')
    store.dispatch(initList()) // 初始化列表
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  // 组件unmount时同步数据到缓存
  componentWillUnmount() {
    console.log('unmount')
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  // App切换到后台时同步数据到缓存
  _handleAppStateChange = async (nextAppState) => {
    if (nextAppState === 'inactive') {
      console.log('inactive sync')
      await AsyncStorage.clear()
      AsyncStorage.multiSet(store.getState().list)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RootTabs />
      </Provider>
    )
  }
}
