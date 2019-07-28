import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // padding: 20,
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
  listItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItemAction: {
    marginLeft: 10,
    width: 18,
    height: 18
  },
  listItemPicker: {
    margin: 0
  },
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
    marginTop: 10,
    // backgroundColor: '#f0f0f0'
  },
  footerButton: {
    marginRight: 10
  },
  footerButtonText: {
    padding: 6,
    textAlign: 'center',
    fontSize: 16,
    color: '#2c2c2c',
    borderWidth: 1,
    borderColor: '#2c2c2c'
  }
});

export default styles
