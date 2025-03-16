import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getPetHealthRecordStyles = (theme: ITheme) => StyleSheet.create({
  // Border left card
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

  // Floating button card
  cardContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
    height: 200,
    borderRadius: 16,
  },
  cardFloatingTitle: {
    position: 'absolute',
    backgroundColor: 'rgb(254, 231, 228)',
    color: 'rgb(252, 113 87)',
    padding: 10,
    width: 200,
    borderRadius: 50,
    top: -15,
    borderColor: 'rgb(250, 247, 254)',
    borderWidth: 6,
    // left: '25%'
    left: 10
  },
});