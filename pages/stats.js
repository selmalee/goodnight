import React, { Component } from 'react'
import {
  View, 
  Text,
  TextInput,
  AsyncStorage,
  FlatList,
  TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { getDate } from '../utils/index'
import styles from '../styles/stats.style'

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showEdit: false,
      editDate: '',
      editTime: '',
      loading: false
    }
    this.listRef = undefined
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
          ref={(list) => { this.listRef = list}}
          keyExtractor={(item) => item[0]}
          refreshing={this.state.loading}
          onRefresh={() => this.getData()}
          extraData={this.state}
          getItemLayout={(data, index) => (
            {length: 48, offset: 48 * index, index}
          )}
          renderItem={({item}) => {
            if (item[0] === this.state.showEdit) {
              return (
                <View style={styles.listItem} key={item[0]}>
                  {/* 编辑输入框 */}
                  <DatePicker
                    date={this.state.editDate}
                    style={styles.listItemPicker}
                    mode="date"
                    placeholder="选择日期"
                    format="YYYY-MM-DD"
                    maxDate={getDate(new Date())}
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    showIcon={false}
                    // customStyles={pickerStyle}
                    onDateChange={(text) => {this.setState({editDate: text})}}
                  />
                  <DatePicker
                    date={this.state.editTime}
                    style={styles.listItemPicker}
                    mode="time"
                    placeholder="选择时间"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    showIcon={false}
                    // customStyles={pickerStyle}
                    onDateChange={(text) => this.handleEditTime(text)}
                  />
                  <TouchableOpacity onPress={() => this.handleEditSubmit()}>
                    <Text style={[styles.listItemButton, styles.colorSuccess]}>确定</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.handleEditCancel()}>
                    <Text style={[styles.listItemButton, styles.colorError]}>取消</Text>
                  </TouchableOpacity>
                </View>
              )
            } else {
              return (
                <View style={styles.listItem} key={item[0]}>
                  {/* 列表项 */}
                  <Text style={styles.listItemText}>{item[0]}</Text>
                  <Text style={styles.listItemText}>{item[1]}</Text>
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
    this.setState({
      loading: true
    })
    const keys = await AsyncStorage.getAllKeys()
    let list = await AsyncStorage.multiGet(keys)
    this.sort(list)
    this.setState({
      list,
      loading: false
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
  async add() {
    this.setState({
      showEdit: 'YYYY-MM-DD',
      list: [...this.state.list, ['YYYY-MM-DD', '']]
    }, () => {
      this.listRef.scrollToEnd()
    })
  }
  // 编辑
  edit(key, value) {
    this.setState({
      editDate: key,
      editTime: value,
      showEdit: key
    })
  }
  handleEditDate(text) {
    this.setState({
      editDate: text
    })
  }
  handleEditTime(text) {
    console.log(text)
    this.setState({
      editTime: text
    })
  }
  // 提交编辑
  async handleEditSubmit() {
    await AsyncStorage.removeItem(this.state.showEdit)
    AsyncStorage.setItem(this.state.editDate, this.state.editTime)
    this.setState({
      showEdit: false,
      editDate: '',
      editTime: ''
    })
    this.getData()
  }
  // 取消编辑
  handleEditCancel() {
    this.setState({
      showEdit: false
    })
    if (AsyncStorage.getItem('YYYY-MM-DD')) {
      AsyncStorage.removeItem('YYYY-MM-DD')
    }
    this.getData()
  }
  // 删除
  async delete(key) {
    await AsyncStorage.removeItem(key)
    this.getData()
  }
  // 清空
  clearAll() {
    AsyncStorage.clear()
    this.getData()
  }
}