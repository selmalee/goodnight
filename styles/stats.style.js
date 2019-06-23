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
    height: '75%',
    paddingBottom: 10
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 18,
    margin: 10
  },
  listItemText: {
    fontSize: 18,
  },
  listItemButton: {
    fontSize: 18,
    flex: 1
  },
  // listItemTime: {
  //   fontSize: 18,
  // },
  listItemPicker: {
    // flex: 1,
    width: 100,
    height: 18
  },
  // listItemButton: {
  //   fontSize: 18,
  // },
  colorError: {
    color: 'red',
  },
  colorInfo: {
    color: 'blue',
  },
  colorSuccess: {
    color: 'green',
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
  }
});

export default styles
