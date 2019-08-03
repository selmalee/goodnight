import {
  StyleSheet
} from 'react-native';

import { defaultColor, primaryColor } from './app.style'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  // --- list ---
  list: {
    flex: 1,
    paddingBottom: 10
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    height: 18,
    margin: 10
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: defaultColor
  },
  listItemTextTime: {
    textAlign: 'center',
    color: primaryColor
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
  // --- footer ----
  footer: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'flex-end',
    margin: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7'
  },
  footerButton: {
    margin: 0,
    marginRight: 10
  },
  footerLeftButton: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  footerButtonText: {
    padding: 6
  }
})

export default styles
