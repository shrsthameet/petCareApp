import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getPetHealthRecordStyles = (theme: ITheme) => StyleSheet.create({
  card: {
    gap: 15,
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 4 
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 16,
    borderLeftWidth: 8,
    borderLeftColor: theme.colors.primary, // Decorative left border
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: theme.colors.primaryContainer,
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 2 
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginRight: 12,
  },
});