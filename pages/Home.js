import React, { Component } from 'react'
import { 
  View,
  Text,
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
        <TouchableOpacity
          onPress={() => this.recordHandler()}>
          <Text style={styles.button}>晚安</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.test()}>
          <Text style={styles.button}>test</Text>
        </TouchableOpacity>
        {/* 导航 */}
        <TouchableOpacity
          style={styles.iconStats}
          onPress={() => this.navToStats()}>
          <Image source={iconStats} />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const now = new Date()
      this.setState({
        time: getTime(now),
        date: getDate(now),
        isOverZero: this.isOverZero()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // 判断熬夜（凌晨-凌晨4点前）
  isOverZero() {
    const now = new Date()
    const zero = new Date(getDate(now) + ' 00:00:00').getTime()
    return now.getTime() - zero < (4 * 60 * 60 * 1000)
  }

  // 判断非正常打卡时间（4点-18点）
  isAbnormal() {
    const now = new Date()
    const zero = new Date(getDate(now) + ' 00:00:00').getTime()
    return now.getTime() - zero > (4 * 60 * 60 * 1000) && now.getTime() - zero < (18 * 60 * 60 * 1000)
  }

  // 昨天
  getYesterday() {
    return new Date((new Date().getTime() - 24 * 60 * 60 * 1000))
  }

  // 记录处理
  async recordHandler() {
    const yesterday = this.getYesterday()
    const now = new Date()
    if(this.state.isOverZero) {
      AlertIOS.alert(
        "选择日期",
        "已到凌晨，请确定记录日期是？",
        [
          {
            text: `今日(${getDate(now)})`,
            onPress: () => {
              this.record(now)
            },
            style: "cancel"
          },
          {
            text: `昨日(${getDate(yesterday)})`,
            onPress: () => {
              this.record(yesterday)
            }
          }
        ]
      )
    } else if (this.isAbnormal()) {
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
              this.record(now)
            }
          }
        ]
      )
    } else {
      this.record(now)
    }
  }
  // 打卡
  record(date) {
    AsyncStorage.setItem(getDate(date), getTime(date))
  }

  async test() {
    for (let i = 0; i < 9; i++) {
      const t1 = new Date(`2019-06-0${i + 1} 23:00:00`)
      const t2 = new Date(`2019-05-0${i + 1} 23:00:00`)
      await AsyncStorage.setItem(getDate(t1), getTime(t1))
      await AsyncStorage.setItem(getDate(t2), getTime(t2))
    }
  }
  // 导航到数据
  navToStats() {
    this.props.navigation.navigate('Stats')
  }

}