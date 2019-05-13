import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  msg: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    marginLeft: '10%',
    width: '80%',
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    backgroundColor: '#0091f9',
    color: '#fff'
  }
});

export default styles
