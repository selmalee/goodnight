/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  TextInput,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import styles from './index.style'

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="请输入你的名字"
          onChangeText={this.handleChangeText.bind(this)}
          value={this.state.text}
        />
        <Button
          color="#0091f9"
          onPress={this.handlePressSure}
          title="确定"
        />
      </View>
    );
  }
  handleChangeText(text) {
    this.setState({text})
  }
  handlePressSure() {
    try {
      await AsyncStorage.setItem('username', this.state.text);
    } catch (error) {
      // Error saving data
      console.error(error)
    }
  }
}

AppRegistry.registerComponent('MyApp', () => MyApp);
