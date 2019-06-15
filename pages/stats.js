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
          style={styles.list}
          data={this.state.list}
          keyExtractor={(item) => item[0]}
          renderItem={({item}) => (
            <View style={styles.listItem} key={item[0]}>
              <Text style={styles.listItemDate}>{item[0]}</Text>
              <Text style={styles.listItemTime}>{item[1]}</Text>
              <TouchableOpacity onPress={() => this.delete(item[0])}>
                <Text style={styles.listItemButton}>删除</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => this.add()}>
            <Text style={styles.footerButtonText}>增加</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => this.clearAll()}>
            <Text style={styles.footerButtonText}>清空</Text>
          </TouchableOpacity>
        </View>
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
    this.setState({
      list
    })
  }

  // 按日期排序
  sort(list) {
    list.sort((a, b) => {
      if (a[0] > b[0]) {
        return 1
      } else {
        return -1
      }
    })
  }

  add() {
    AsyncStorage.setItem('aaa', 'xxx')
    this.getData()
  }

  clearAll() {
    AsyncStorage.clear()
    this.getData()
  }

  async delete(key) {
    await AsyncStorage.removeItem(key)
    this.getData()
  }

  navToHome() {
    this.props.navigation.goBack()
  }
}