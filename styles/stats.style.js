import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  list: {
    height: '80%'
  },
  listItemDate: {
    fontSize: 18
  },
  listItemTime: {
    fontSize: 18
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  listItemButton: {
    fontSize: 18,
    color: 'red',
  },
  footer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  footerButton: {
    marginRight: 10
  },
  footerButtonText: {
    padding: 6,
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#000'
  },
  iconHome: {
    position:'absolute',
    bottom: 10,
    left: 10
  }
});

export default styles
