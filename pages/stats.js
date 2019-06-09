import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native'

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.getData()
  }
  render() {
    return (
      <View>
        {this.state.list.map(item => (
          <Text key={item}>{item}</Text>
        ))}
      </View>
    );
  }

  async getData() {
    const keys = await AsyncStorage.getAllKeys()
    const list = await AsyncStorage.multiGet(keys)
    console.log(list)
    this.setState({
      list: keys
    })
  }
}