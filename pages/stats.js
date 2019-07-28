import React, { Component } from 'react'
import {
  Alert,
  View, 
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  AppState,
  Image } from 'react-native'
import Edit from './Edit'
import styles from '../styles/stats.style'
import { getDate } from '../utils/index'
import Dimensions from 'Dimensions'
import iconDelete from '../img/close-circle.png'
import iconEdit from '../img/edit.png'

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
    // 切换到数据页时，如果有新打卡数据，改变list后删除新打卡数据
    this.props.navigation.addListener('didFocus', async (payload) => {
      this.getData()
    })
  }
  // 组件mount时获取缓存数据
  componentDidMount() {
    console.log('mount')
    this.getData()
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  // 组件unmount时同步数据到缓存
  componentWillUnmount() {
    console.log('unmount')
    this.syncData()
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      // App切换到后台时同步数据到缓存
      console.log('inactive sync')
      this.syncData()
    }
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
                submit={(date, time) => this.submitHandler(date, time)}
                cancel={() => this.cancelHandler()} />
              )
            } else {
              return (
                <View style={styles.listItem} key={item[0]}>
                  {/* 列表项 */}
                  <Text style={styles.listItemText}>{item[0]}</Text>
                  <Text style={styles.listItemText}>{item[1]}</Text>
                  <View style={styles.listItemActions}>
                    <TouchableOpacity onPress={() => this.edit(item[0])}>
                      <Image style={styles.listItemAction} source={iconEdit} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.delete(item[0])}>
                      <Image style={styles.listItemAction} source={iconDelete} />
                    </TouchableOpacity>
                  </View>
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
      showEdit: '',
      list: [...this.state.list, ['', '']]
    }, () => {
      console.log(this.state.list.length * this.listItemHeight)
      console.log(Dimensions.get('window').height * 0.75)
      // 超过一页，滚动到最底部
      if (this.state.list.length * this.listItemHeight > Dimensions.get('window').height * 0.75) {
        this.listRef.scrollToEnd()
      }
    })
  }
  // 编辑
  edit(key) {
    this.setState({
      showEdit: key
    })
  }
  // 提交编辑/新增数据
  submitHandler(date, time) {
    if (!date || !time) {
      return false
    }
    // 覆盖该天数据（如果相同）、去掉编辑前数据 -> 新增数据 -> 排序
    const list = this.state.list
      .filter(item => item[0] !== this.state.showEdit && item[0] !== date)
      .concat([[date, time]])
    this.setState({
      list: this.sort(list),
      showEdit: false
    })
    return true
  }
  // 取消编辑
  cancelHandler() {
    this.setState({
      showEdit: false,
      list: this.state.list.filter(item => item[0] !== '')
    })
    // 超过一页，滚动到最顶部
    // if (this.state.list.length * this.listItemHeight > Dimensions.get('window').height * 0.75) {
    //   this.listRef.scrollToIndex({viewPosition: 0})
    // }
  }
  // 删除
  async delete(key) {
    Alert.alert(
      "请确认",
      `是否删除${key}的数据？`,
      [
        {
          text: '确定',
          onPress: () => {
            this.setState({
              list: this.state.list.filter(item => item[0] !== key)
            })
          }
        },
        { text: '取消' }
      ]
    )
  }
  // 清空
  clearAll() {
    Alert.alert(
      "请确认",
      "是否清空所有数据？",
      [
        {
          text: '确定',
          onPress: () => {
            this.setState({
              list: []
            })
          }
        },
        { text: '取消' }
      ]
    )
  }
}
