import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getPetCardStyles = (theme: ITheme) => StyleSheet.create({
  boxShadow: {
    borderRadius: 15,
    backgroundColor: theme.colors.onPrimary,
    height: 240,
    width: 200,
    // For ios shadow
    shadowColor: '#a5a5a5',
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