import React, { Component } from 'react';
import {
  View, 
  Text, 
  Image,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity } from 'react-native'
import styles from '../styles/stats.style'
import iconHome from '../img/icon-home.png'

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.getData()
  }

  static navigationOptions = {
    title: '数据'
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.list}
          keyExtractor={(item) => item[0]}
          renderItem={({item}) => (
            <View style={styles.item} key={item[0]}>
              <Text style={styles.date}>{item[0]}</Text>
              <Text style={styles.time}>{item[1]}</Text>
              <Button title="删除" onPress={() => this.delete(item[0])}></Button>
            </View>
          )}
        />
        <Button title="清空" onPress={this.clearAll}></Button>
        {/* 导航 */}
        <TouchableOpacity style={styles.iconHome} onPress={() => this.navToHome()}>
          <Image source={iconHome} />
        </TouchableOpacity>
      </View>
    );
  }

  async getData() {
    const keys = await AsyncStorage.getAllKeys()
    let list = await AsyncStorage.multiGet(keys)
    this.sort(list)
    console.log(list)
    this.setState({
      list
    })
  }

  sort(list) {
    list.sort((a, b) => {
      if (a[0] > b[0]) {
        return 1
      } else {
        return -1
      }
    })
  }

  clearAll() {
    AsyncStorage.clear()
  }

  async delete(key) {
    await AsyncStorage.removeItem(key)
    this.getData()
  }

  navToHome() {
    this.props.navigation.goBack()
  }
}