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
      newDate: '',
      showEdit: false,
      editDate: '',
      editTime: ''
    }
  }

  static navigationOptions = {
    title: '数据'
  }

  componentDidMount() {
    console.log('mount')
    this.getData()
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 滚动列表 */}
        <FlatList
          style={styles.list}
          data={this.state.list}
          keyExtractor={(item) => item[0]}
          renderItem={({item}) => {
            if (item[0] === this.state.showEdit) {
              return (
                <View style={styles.listItem} key={item[0]}>
                  {/* 编辑输入框 */}
                  <TextInput
                    style={styles.listItemDate}
                    placeholder="YYYY-mm-dd"
                    onChangeText={(text) => this.setState({ editDate: text })}
                    value={this.state.editDate}
                  />
                  <TextInput
                    style={styles.listItemTime}
                    placeholder="hh:mm:ss"
                    onChangeText={(text) => this.setState({ editTime: text })}
                    value={this.state.editTime}
                  />
                  <TouchableOpacity onPress={() => this.handleEditSubmit()}>
                    <Text style={[styles.listItemButton, styles.colorSuccess]}>OK</Text>
                  </TouchableOpacity>
                </View>
              )
            } else {
              return (
                <View style={styles.listItem} key={item[0]}>
                  {/* 列表项 */}
                  <Text style={styles.listItemDate}>{item[0]}</Text>
                  <Text style={styles.listItemTime}>{item[1]}</Text>
                  <TouchableOpacity onPress={() => this.edit(item[0], item[1])}>
                    <Text style={[styles.listItemButton, styles.colorInfo]}>编辑</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.delete(item[0])}>
                    <Text style={[styles.listItemButton, styles.colorError]}>删除</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          }}
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
  // 新增
  add() {
    this.setState({
      showNew: true
    })
    AsyncStorage.setItem('aaa', 'xxx')
    this.getData()
  }
  // 编辑
  edit(key, value) {
    this.setState({
      editDate: key,
      editTime: value,
      showEdit: key
    })
    this.getData()
  }
  handleEditDate(text) {
    this.setState({
      editDate: text
    })
  }
  handleEditTime(text) {
    this.setState({
      editTime: text
    })
  }
  async handleEditSubmit() {
    await AsyncStorage.removeItem(this.state.showEdit)
    AsyncStorage.setItem(this.state.editDate, this.state.editTime)
    this.setState({
      showEdit: false
    })
    this.getData()
  }
  // 删除
  async delete(key) {
    await AsyncStorage.removeItem(key)
    this.getData()
  }

  handleChangeText() {

  }
  // 清空
  clearAll() {
    AsyncStorage.clear()
    this.getData()
  }
}