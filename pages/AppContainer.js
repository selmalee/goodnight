import { createAppContainer, createStackNavigator } from 'react-navigation';
// you can also import from @react-navigation/native
import Home from './Home'
import Stats from './Stats'

const AppNavigator = createStackNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  Home: {
    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: Home,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    path: 'home',
    // The action and route params are extracted from the path.

    // Optional: Override the `navigationOptions` for the screen
    navigationOptions: ({  }) => ({
      title: `打卡'`
    })
  },
  Statis: {
    screen: Stats,
    path: 'stats',
    navigationOptions: ({  }) => ({
      title: `数据`
    })
  }
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
