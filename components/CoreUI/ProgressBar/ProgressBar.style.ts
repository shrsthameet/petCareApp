import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getProgressBarStyle = (theme: ITheme) => StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
});