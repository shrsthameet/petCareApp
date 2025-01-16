import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getCustomDateTimePickerStyles = (theme: ITheme) => StyleSheet.create({
  inputText: {
    fontSize: 16,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: -2 
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});