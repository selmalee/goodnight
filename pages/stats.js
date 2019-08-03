import React, { Component } from 'react'
import {
  Alert,
  View, 
  Text,
  FlatList,
  TouchableOpacity,
  Image } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { setList } from '../action/'
import iconDelete from '../img/close-circle.png'
import store from '../store'
import styles from '../styles/stats.style'
import appStyles from '../styles/app.style'
import { sortListFn } from '../utils/index'

const datePickerProps = {
  style: styles.listItemPicker,
  confirmBtnText: "确定",
  cancelBtnText: "取消",
  showIcon: false,
  customStyles: {
    dateInput: {
      height: 24
    }
  }
}

export default class Stats extends Component {
  listItemHeight = 48
  _unsubscribe = undefined

  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      list: store.getState().list,
      editList: store.getState().list
    }
  }
  
  // flatList组件renderItem函数所依赖的props数据（包括data属性以及可能用到的父组件的state）改变（如果是引用数据类型则需要改变引用地址），才会重新渲染
  // 监听store变化并在unmount前解绑
  componentDidMount() {
    this._unsubscribe = store.subscribe(() => {
      this.setState({
        list: store.getState().list,
        editList: store.getState().list
      })
    })
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 工具栏 */}
        {
          this.state.showEdit ?
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton} onPress={() => this._submitEditHandler()}>
              <Text style={[appStyles.button_primary, styles.footerButtonText]}>确定</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => this._cancelHandler()}>
              <Text style={[appStyles.button, styles.footerButtonText]}>取消</Text>
            </TouchableOpacity>
          </View> : 
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerLeftButton} onPress={() => this.setState({ showEdit: true })}>
              <Text style={[appStyles.button_primary, styles.footerButtonText]}>编辑</Text>
            </TouchableOpacity>
          </View>
        }
        {/* 滚动列表 */}
        {
          this.state.showEdit ?
          <FlatList
            style={styles.list}
            data={this.state.editList}
            keyExtractor={(item) => item[0]}
            getItemLayout={(data, index) => (
              {length: this.listItemHeight, offset: this.listItemHeight * index, index}
            )}
            renderItem={({item}) => {
              return (
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>{item[0]}</Text>
                  {/* 编辑输入框 */}
                  <DatePicker
                    date={item[1]}
                    mode="time"
                    placeholder="选择时间"
                    {...datePickerProps}
                    onDateChange={(text) => this._editHandler(item[0], text)}
                  />
                  <View style={styles.listItemActions}>
                    <TouchableOpacity onPress={() => this._delHandler(item[0])}>
                      <Image style={styles.listItemAction} source={iconDelete} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          ></FlatList> :
          <FlatList
            style={styles.list}
            data={this.state.list}
            keyExtractor={(item) => item[0]}
            getItemLayout={(data, index) => (
              {length: this.listItemHeight, offset: this.listItemHeight * index, index}
            )}
            renderItem={({item}) => {
              return (
                <View style={styles.listItem} key={item[0]}>
                  {/* 列表项 */}
                  <Text style={styles.listItemText}>{item[0]}</Text>
                  <Text style={[styles.listItemText, styles.listItemTextTime]}>{item[1]}</Text>
                </View>
              )
            }}
          ></FlatList>
        }
      </View>
    );
  }
  // 提交编辑
  _submitEditHandler() {
    Alert.alert(
      "确认",
      "确定提交修改？",
      [
        {
          text: '取消',
          style: "cancel"
        },
        {
          text: '确定',
          onPress: () => {
            store.dispatch(setList(this.state.editList))
            this.setState({
              showEdit: false
            })
          },
        }
      ]
    )
  }
  // 取消
  _cancelHandler() {
    this.setState({
      showEdit: false,
      editList: store.getState().list
    })
  }
  // 编辑-编辑时间
  _editHandler (key, value) {
    let editList = this.state.editList.filter(item => item[0] !== key).concat([[key, value]])
    editList.sort(sortListFn)
    this.setState({
      editList
    })
  }
  // 编辑-删除记录
  _delHandler (key) {
    this.setState({
      editList: this.state.editList.filter(item => item[0] !== key)
    })
  }
}
