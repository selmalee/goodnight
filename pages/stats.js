import React, { Component } from 'react'
import {
  View, 
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity } from 'react-native'
import Edit from './Edit'
import styles from '../styles/stats.style'
import Dimensions from 'Dimensions'

export default class Stats extends Component {
  listItemHeight = 48

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showEdit: false,
      loading: false
    }
    this.listRef = undefined
    this.props.navigation.addListener('didFocus', (payload) => {
      console.log('didFocus')
      this.getData()
    })
    this.props.navigation.addListener('didBlur', (payload) => {
      console.log('didBlur')
      this.syncData()
    })
  }

  componentDidMount() {
    console.log('mount')
    this.getData()
  }

  componentWillUnmount() {
    console.log('unmount')
    this.syncData()
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
          extraData={this.state}
          getItemLayout={(data, index) => (
            {length: this.listItemHeight, offset: this.listItemHeight * index, index}
          )}
          renderItem={({item}) => {
            if (item[0] === this.state.showEdit) {
              return (
                <Edit
                item={item}
                submit={(date, time) => this.editSubmitHanlder(date, time)}
                cancel={() => this.editCancelHandler()} />
              )
            } else {
              return (
                <View style={styles.listItem} key={item[0]}>
                  {/* 列表项 */}
                  <Text style={styles.listItemText}>{item[0]}</Text>
                  <Text style={styles.listItemText}>{item[1]}</Text>
                  <TouchableOpacity onPress={() => this.edit(item[0])}>
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
  // 获取storage的数据
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
  // 同步数据到storage
  async syncData() {
    await AsyncStorage.clear()
    AsyncStorage.multiSet(this.state.list)
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
    return list
  }
  // 新增
  async add() {
    this.setState({
      showEdit: 'YYYY-MM-DD',
      list: [...this.state.list, ['YYYY-MM-DD', '']]
    }, () => {
      console.log(this.state.list.length * this.listItemHeight)
      console.log(Dimensions.get('window').height)
      this.listRef.scrollToEnd()
    })
  }
  // 编辑
  edit(key) {
    this.setState({
      showEdit: key
    })
  }
  // 提交编辑
  async editSubmitHanlder(date, time) {
    // 覆盖该天数据（如果相同）、去掉编辑前数据 -> 新增数据 -> 排序
    const list = this.state.list
      .filter(item => item[0] !== this.state.showEdit && item[0] !== date)
      .concat([[date, time]])
    this.setState({
      list: this.sort(list),
      showEdit: false
    })
  }
  // 取消编辑
  editCancelHandler() {
    this.setState({
      showEdit: false,
      list: this.state.list.filter(item => item[0] !== 'YYYY-MM-DD')
    })
  }
  // 删除
  async delete(key) {
    this.setState({
      list: this.state.list.filter(item => item[0] !== key)
    })
  }
  // 清空
  clearAll() {
    this.setState({
      list: []
    })
  }
}
