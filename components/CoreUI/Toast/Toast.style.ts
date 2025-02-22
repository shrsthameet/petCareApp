import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getToastStyle = (theme: ITheme) => StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999, // Ensure visibility above everything
  },
  topPosition: {
    top: 65,
  },
  bottomPosition: {
    bottom: 40,
  },
  toastText: {
    color: theme.colors.onText,
    flex: 1,
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
  success: {
    backgroundColor: '#fff',
    borderLeftWidth: 8,
    borderLeftColor: '#28a745',
  },
  error: {
    backgroundColor: '#fff',
    borderLeftWidth: 8,
    borderLeftColor: '#dc3545',
  },
  info: {
    backgroundColor: '#fff',
    borderLeftWidth: 8,
    borderLeftColor: '#007AFF',
  },
  warning: {
    backgroundColor: '#fff',
    borderLeftWidth: 8,
    borderLeftColor: '#ffc107',
  },
});