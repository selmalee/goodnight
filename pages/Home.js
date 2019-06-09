import React, { Component } from 'react'
import { 
  View,
  Text, 
  Button, 
  AsyncStorage, 
  Image, 
  TouchableOpacity} from 'react-native'
import { getDate, getTime } from '../utils/index'
import iconStats from '../img/icon-stats.png'
import styles from '../styles/home.style'

export default class Home extends Component {
  interval = null

  constructor(props) {
    super(props);
    const now = new Date()
    this.state = {
      date: getDate(now),
      time: getTime(now),
      showYesterday: true
    }
  }

  static navigationOptions = {
    title: '打卡'
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 晚安 */}
        <Text>{this.state.time}</Text>
        <Button
          title="晚安"
          onPress={() => this.goodnight()}
        />
        {/* 调整日期 */}
        <Text>记录日期：{this.state.date}</Text>
        {this.state.showYesterday && <Button
          title="昨天"
          onPress={() => this.yesterday()}
        />}
        <Button
          title="测试"
          onPress={() => this.test()}
        />
        {/* 导航 */}
        <TouchableOpacity style={styles.iconStats} onPress={() => this.navToStats()}>
          <Image source={iconStats} />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const now = new Date()
      this.setState({
        date: getDate(now),
        time: getTime(now)
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  navToStats() {
    this.props.navigation.navigate('Stats')
  }

  yesterday() {

  }

  async goodnight() {
    const now = new Date()
    const nowDate = getDate(now)
    this.setState({
      date: nowDate
    })
    await AsyncStorage.setItem(nowDate, getTime(now))
  }

  test() {
    const t1 = new Date('2019-06-02 23:00:00')
    const t2 = new Date('2019-06-03 23:30:00')
    const t3 = new Date('2019-06-01 00:30:00')
    AsyncStorage.setItem(getDate(t1), getTime(t1))
    AsyncStorage.setItem(getDate(t2), getTime(t2))
    AsyncStorage.setItem(getDate(t3), getTime(t3))
  }

}