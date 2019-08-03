import {
  StyleSheet
} from 'react-native';

export const primaryColor = '#2c2c2c'
export const defaultColor = '#707070'

const button = {
  fontSize: 16,
  color: primaryColor,
  textAlign: 'center',
  borderWidth: 1,
  borderColor: primaryColor
}

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 26,
    height: 26
  },
  button,
  button_primary: {
    ...button,
    color: '#fff',
    backgroundColor: primaryColor
  }
});

export default styles
