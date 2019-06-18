import React, { Component } from 'react';
import {
  View, 
  Text,
  TextInput,
  AsyncStorage,
  FlatList,
  TouchableOpacity } from 'react-native'
import styles from '../styles/stats.style'

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showNew: false,
      newDate: ''
    }
    this.getData()
  }

  static navigationOptions = {
    title: '数据'
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 滚动列表 */}
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
        ></FlatList>
        {/* 新增输入框 */}
        {this.state.showNew && <View style={[styles.listItem, styles.new]}>
          <TextInput
            style={styles.listItemDate}
            placeholder="YYYY-mm-dd"
            onChangeText={() => this.handleChangeText()}
            value={this.state.newDate}
          />
          <TextInput
            style={styles.listItemTime}
            placeholder="YYYY-mm-dd"
            onChangeText={() => this.handleChangeText()}
            value={this.state.newDate}
          />
          <TouchableOpacity onPress={() => this.delete(item[0])}>
            <Text style={styles.listItemButton}>OK</Text>
          </TouchableOpacity>
        </View>}
        {/* 底部按钮 */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => this.add()}>
            <Text style={styles.footerButtonText}>增加</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => this.clearAll()}>
            <Text style={styles.footerButtonText}>清空</Text>
          </TouchableOpacity>
        </View>
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
    this.setState({
      showNew: true
    })
    AsyncStorage.setItem('aaa', 'xxx')
    this.getData()
  }

  handleChangeText() {

  }

  clearAll() {
    AsyncStorage.clear()
    this.getData()
  }

  async delete(key) {
    await AsyncStorage.removeItem(key)
    this.getData()
  }
}