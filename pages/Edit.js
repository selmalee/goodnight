import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import styles from '../styles/stats.style'
import DatePicker from 'react-native-datepicker'
import { getDate } from '../utils/index'

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDate: props.item[0],
      editTime: props.item[1]
    }
  }
  render() {
    return (
      <View style={styles.listItem}>
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
          onDateChange={(text) => {
            this.setState({ editDate: text })
          }}
        />
        <DatePicker
          date={this.state.editTime}
          style={styles.listItemPicker}
          mode="time"
          placeholder="选择时间"
          confirmBtnText="确定"
          cancelBtnText="取消"
          showIcon={false}
          onDateChange={(text) => {
            this.setState({ editTime: text })
          }}
        />
        <TouchableOpacity onPress={() => this.submit()}>
          <Text style={[styles.listItemButton, styles.colorSuccess]}>确定</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.cancel}>
          <Text style={[styles.listItemButton, styles.colorError]}>取消</Text>
        </TouchableOpacity>
      </View>
    )
  }
  // 提交编辑
  async submit() {
    this.props.submit(this.state.editDate, this.state.editTime)
    this.setState({
      editDate: '',
      editTime: ''
    })
  }
}