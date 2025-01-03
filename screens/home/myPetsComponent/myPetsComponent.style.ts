import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getMyPetStyles = (theme: ITheme) => StyleSheet.create({
  petsContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  petsContent: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
});