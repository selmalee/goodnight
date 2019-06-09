import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  date: {
    marginRight: 10,
    fontSize: 18
  },
  time: {
    fontSize: 18
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    margin: 10
    // borderColor: 'gray',
    // borderWidth: 1
  },
  iconHome: {
    position:'absolute',
    bottom: 10,
    left: 10
  }
});

export default styles
