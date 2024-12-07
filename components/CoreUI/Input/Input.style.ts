import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export const inputStyles = (leftIcon?: boolean | null) => StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 2,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.black,
    paddingLeft: leftIcon ? 45 : 15, // Default padding for text
  },
  textarea: {
    height: 150,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  rounded: {
    borderRadius: 50, // Make the input fully rounded
  },
  iconLeft: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
});