import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from '../styles/stats.style'
import DatePicker from 'react-native-datepicker'
import iconDelete from '../img/close-circle.png'
import store from '../store';
// import iconCheck from '../img/check.png'

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

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editList: store.getState().list
    }
  }
  render() {
    return (
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
                <TouchableOpacity onPress={() => _delHandler(item[0])}>
                  <Image style={styles.listItemAction} source={iconDelete} />
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      ></FlatList>
    )
  }
  _editHandler (key, value) {
    this.setState({
      editList: this.state.editList.filter(item => item[0] !== key).concat([key, value])
    })
  }

  _delHandler (key) {
    this.setState({
      editList: his.state.editList.filter(item => item[0] !== key)
    })
  }

  getEditList () {
    return this.state.editList
  }
}
