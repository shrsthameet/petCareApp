import { StyleSheet } from 'react-native';

export const petStyles = StyleSheet.create({
  boxShadow: {
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 240,
    width: 200,
    // For ios shadow
    shadowColor: '#333333',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    // For android shadow
    elevation: 4
  }
});