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
    height: '70%'
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
  new: {
    marginTop: 10,
    flex: 1,
    height: 50
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
    bottom: 20,
    left: 10,
    width: 40,
    height: 40
  }
});

export default styles
