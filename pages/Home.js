import React, { Component } from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'
import { setRecord } from '../action/'
import store from '../store'
import appStyles from '../styles/app.style'
import styles from '../styles/home.style'
import { getDate, getTime } from '../utils/index'

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

  render() {
    return (
      <View style={styles.container}>
        {/* 晚安 */}
        <Text style={styles.time}>{this.state.time}</Text>
        <TouchableOpacity
          onPress={() => this.recordHandler()}>
          <Text style={[appStyles.button_primary, styles.button]}>晚安</Text>
        </TouchableOpacity>
        {this.state.overZero && <Text style={styles.msg}>熬夜会变丑哦。明天会没精神哦。</Text>}
        {/* <TouchableOpacity
          onPress={() => this.test()}>
          <Text style={styles.button}>test</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const now = new Date()
      this.setState({
        time: getTime(now),
        date: getDate(now),
        overZero: this.isOverZero()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // 判断熬夜（凌晨-凌晨4点前）
  isOverZero() {
    const now = new Date()
    const zero = new Date().setHours(0, 0, 0, 0)
    return (now.getTime() - zero) < (4 * 60 * 60 * 1000)
  }

  // 判断非正常打卡时间（4点-18点）
  isAbnormal() {
    const now = new Date()
    const zero = new Date().setHours(0, 0, 0, 0)
    return (now.getTime() - zero) > (4 * 60 * 60 * 1000) && (now.getTime() - zero) < (18 * 60 * 60 * 1000)
  }

  // 昨天
  getYesterday() {
    return new Date((new Date().getTime() - 24 * 60 * 60 * 1000))
  }

  // 记录处理
  async recordHandler() {
    this.isAbnormal()
    const yesterday = this.getYesterday()
    const now = new Date()
    if(this.state.overZero) {
      Alert.alert(
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
      Alert.alert(
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
  async record(date) {
    store.dispatch(setRecord(getDate(date), getTime(date)))
    Alert.alert("", "打卡成功！")
  }

  // async test() {
  //   for (let i = 0; i < 9; i++) {
  //     const t1 = new Date(`2019-06-0${i + 1}`)
  //     // const t2 = new Date(`2019-05-0${i + 1}`)
  //     // console.log(t1, t2)
  //     AsyncStorage.setItem(getDate(t1), getTime(t1))
  //     // AsyncStorage.setItem(getDate(t2), getTime(t2))
  //   }
  // }

}