## 晚安打卡

![打卡](https://seminelee.github.io/static/2019/08/ios-1.png)
![历史数据](https://seminelee.github.io/static/2019/08/ios-2.png)
![编辑数据](https://seminelee.github.io/static/2019/08/ios-3.png)

## 报错记录
#### Could not find iPhone 6 simulator
node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js line30
Replace ```version.indexOf('iOS') !== 0``` with ``` !version.includes('iOS') ```
