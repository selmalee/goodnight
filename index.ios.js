/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry
} from 'react-native';
import { Provider } from 'react-redux'
import App from './pages/App'
import configureStore from './store';

// 调用 store 文件中的 mainReducer常量中保存的方法
const store = configureStore();


AppRegistry.registerComponent('goodnight', (
  <Provider store={store}>
    <App/>
  </Provider>
));
