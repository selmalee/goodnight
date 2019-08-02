import React, { Component } from 'react'
import {
  View,  } from 'react-native'
import styles from '../styles/stats.style'
import store from '../store';

export default class Week extends Component {

  constructor(props) {
    super(props);
    console.log(store.getState().list)
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}
