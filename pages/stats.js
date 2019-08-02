import React, { Component } from 'react'
import {
  Alert,
  View, 
  Text,
  FlatList,
  TouchableOpacity,
  Image } from 'react-native'
// import Edit from '../components/Edit'
import styles from '../styles/stats.style'
import iconDelete from '../img/close-circle.png'
import DatePicker from 'react-native-datepicker'
import store from '../store';
import { setList } from '../action/';

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

  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      editList: store.getState().list
    }
    // 切换到数据页时，如果有新打卡数据，改变list后删除新打卡数据
    this.props.navigation.addListener('didFocus', async (payload) => {
      // this.getData()
      console.log(store.getState().list)
      // this.setState({
      //   editList: store.getState().list
      // })
      // console.log(this.state.list)
    })
  }

  render() {
    return (
      <View style={styles.container}>
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
            data={store.getState().list}
            keyExtractor={(item) => item[0]}
            getItemLayout={(data, index) => (
              {length: this.listItemHeight, offset: this.listItemHeight * index, index}
            )}
            renderItem={({item}) => {
              return (
                <View style={styles.listItem} key={item[0]}>
                  {/* 列表项 */}
                  <Text style={styles.listItemText}>{item[0]}</Text>
                  <Text style={styles.listItemText}>{item[1]}</Text>
                </View>
              )
            }}
          ></FlatList>
        }
        {/* 新增输入框 */}
        {/* 底部按钮 */}
        <View style={styles.footer}>
          {
            this.state.showEdit ?
            <View style={styles.footer}>
              <TouchableOpacity style={styles.footerButton} onPress={() => this._submitEditHandler()}>
                <Text style={[styles.footerButtonText, styles.footerButtonText_success]}>确定</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerButton} onPress={() => this._cancelHandler()}>
                <Text style={styles.footerButtonText}>取消</Text>
              </TouchableOpacity>
            </View> : 
            <TouchableOpacity style={styles.footerLeftButton} onPress={() => this.setState({ showEdit: true })}>
              <Text style={[styles.footerButtonText, styles.footerButtonText_info]}>编辑</Text>
            </TouchableOpacity>
          }
        </View>
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
    console.log(this.state.editList.filter(item => item[0] !== key).concat([[key, value]]))
    this.setState({
      editList: this.state.editList.filter(item => item[0] !== key).concat([[key, value]])
    })
  }
  // 编辑-删除记录
  _delHandler (key) {
    this.setState({
      editList: this.state.editList.filter(item => item[0] !== key)
    })
  }
}
