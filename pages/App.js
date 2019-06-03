import React, { Component } from 'react';
import { AsyncStorage } from "react-native"
import Welcome from './Welcome';
import Home from './Home';
import {
  View,
  Text
} from 'react-native'
import styles from '../styles/app.style'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: ''
    }
    this.getUsername()
  }

  async getUsername() {
    const value = await AsyncStorage.getItem('username');
    this.setState({
      username: value,
      loading: false
    })
  }

  render() {
    return (
      <Home />
    )
  }
}
