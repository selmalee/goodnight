import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage} from 'react-native'

export default class Home extends Component {
  constructor(props) {
    super(props);
    const date = new Date().toLocaleDateString()
    this.state = {
      date,
      showYesterday: true
    }
  }
  render() {
    return (
      <View>
        <Text>记录日期：{this.state.date}</Text>
        <Button
          title="昨天"
          onPress={() => this.yesterday()}
        />
        <Button
          title="晚安"
          onPress={() => this.goodnight()}
        />
        <Button
          title="数据"
          onPress={() => this.navToStats()}
        />
      </View>
    );
  }

  navToStats() {
    this.props.navigation.navigate('Stats')
  }

  yesterday() {

  }

  async goodnight() {
    const time = new Date().toLocaleTimeString()
    await AsyncStorage.setItem(this.state.date, time)
  }
}