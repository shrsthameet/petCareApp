import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getServiceCardStyles = (theme: ITheme) => StyleSheet.create({
  iconContainer: {
    backgroundColor: theme.colors.primaryContainer,
    padding: 8,
    borderRadius: 15,
    width: 55,
    height: 55
  }
});