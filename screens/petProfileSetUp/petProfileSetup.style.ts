import { Platform, StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';
import { OSType } from '@/utils/enum';

export const getPetProfileSetupStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: Platform.OS === OSType.ANDROID ? theme.spacing.xxl * 2.5 : theme.spacing.xxl * 2,
  },
  image: {
    width: 110,
    height: 250,
  },
  profileCompleteImg: {
    width: 210,
    height: 350
  }
});