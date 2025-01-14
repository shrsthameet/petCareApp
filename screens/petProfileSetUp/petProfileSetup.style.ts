import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getPetProfileSetupStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xl
  },
  image: {
    width: 110,
    height: 250,
  },
});