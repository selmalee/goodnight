### 编译并运行
``` bash
react-native run-ios
```

### 报错记录
**Could not find iPhone 6 simulator**
node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js line30
Replace ```version.indexOf('iOS') !== 0``` with ``` !version.includes('iOS') ```

**GoodNight has not been registered**
进程冲突，关闭模拟器后重新运行
或者是index.ios.js与./ios/项目名/appDelegate.m或者./android/app/src/main/java/com/项目名/MainActivity.java中的项目名不一致

**no bundle url present**
 1. 
 ``` bash
 cd ios
 rm -rf build
 # 重新运行
 ```
 2. 网络代理问题
ios/GoodNight/AppDelegate.m
``` c
  // jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  jsCodeLocation = [NSURL URLWithString:@"http://127.0.0.1:8081/index.ios.bundle?platform=ios&dev=true"]; 
```

**Print: Entry, ":CFBundleIdentifier", Does Not Exist**

