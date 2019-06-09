import React, { Component } from 'react'
import { 
  View,
  Text, 
  Button, 
  AsyncStorage, 
  Image, 
  TouchableOpacity,
  AlertIOS
} from 'react-native'
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
      yesterday: false,
      overZero: this.isOverZero()
    }
  }

  static navigationOptions = {
    title: '打卡'
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 晚安 */}
        <Text style={styles.time}>{this.state.time}</Text>
        {this.state.overZero && <Text>熬夜会变丑哦。明天会没精神哦。</Text>}
        <Button
          title="晚安"
          onPress={() => this.goodnight()}
        />
        {/* 调整日期 */}
        {/* <Text>记录日期：{this.state.date}</Text>
        {this.state.overZero && <Button
          title={this.state.yesterday ? '今天' : '昨天'}
          onPress={() => this.toggleDate()}
        />} */}
        {/* 导航 */}
        <TouchableOpacity style={styles.iconStats} onPress={() => this.navToStats()}>
          <Image source={iconStats} />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const now = this.state.yesterday ? new Date((new Date().getTime() - 24 * 60 * 60 * 1000)) : new Date()
      this.setState({
        time: getTime(now),
        date: getDate(now)
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  isOverZero() {
    const now = new Date()
    const zero = new Date(getDate(now) + ' 00:00:00').getTime()
    return now.getTime() - zero < (4 * 60 * 60 * 1000)
  }

  isAbnormal() {
    return false
  }

  getYesterday() {
    return new Date((new Date().getTime() - 24 * 60 * 60 * 1000))
  }

  toggleDate() {
    const now = this.state.yesterday ? this.getYesterday() : new Date()
    this.setState({
      yesterday: !this.state.yesterday,
      date: getDate(now)
    })
  }

  async goodnight() {
    if(this.isOverZero()) {
      AlertIOS.alert(
        "选择日期",
        "已过24点，请确定记录日期是今日还是昨日？",
        [
          {
            text: "今日",
            onPress: () => {
              this.record(new Date())
            },
            style: "cancel"
          },
          {
            text: "昨日",
            onPress: () => {
              this.record(this.getYesterday())
            }
          }
        ]
      )
    } else if (this.isAbnormal()) {
      if(this.isOverZero()) {
        AlertIOS.alert(
          "请确认",
          "非正常睡觉时间。确定打卡？",
          [
            {
              text: "取消",
              onPress: () => {},
              style: "cancel"
            },
            {
              text: "确定",
              onPress: () => {
                this.record(new Date())
              }
            }
          ]
        )
      }
    } else {
      this.record(new Date())
    }
  }

  record(date) {
    AsyncStorage.setItem(getDate(date), getTime(date))
  }

  test() {
    const t1 = new Date('2019-06-02 23:00:00')
    const t2 = new Date('2019-06-03 23:30:00')
    const t3 = new Date('2019-06-01 00:30:00')
    AsyncStorage.setItem(getDate(t1), getTime(t1))
    AsyncStorage.setItem(getDate(t2), getTime(t2))
    AsyncStorage.setItem(getDate(t3), getTime(t3))
  }

  navToStats() {
    this.props.navigation.navigate('Stats')
  }

}