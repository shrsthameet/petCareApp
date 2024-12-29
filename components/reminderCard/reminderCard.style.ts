import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const createReminderStyles = (theme: ITheme) => StyleSheet.create({
  reminderContainer: {
    backgroundColor: theme.colors.primary,
    padding: 25,
    borderRadius: 16,
  }
});