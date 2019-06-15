import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  time: {
    marginTop: '30%',
    fontSize: 40
  },
  button: {
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#000'
  },
  nav: {
    position:'absolute',
    bottom: 20,
    right: 10
  },
  navIcon: {
    width: 40,
    height: 40
  }
});

export default styles
