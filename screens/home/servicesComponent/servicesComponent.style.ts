import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getServicesComponentStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md
  }
});