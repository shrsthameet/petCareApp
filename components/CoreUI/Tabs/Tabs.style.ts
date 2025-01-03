import { StyleSheet } from 'react-native';
import { ITheme } from '@/utils/types';

export const getTabsStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  tabHeaders: {
    // backgroundColor: '#f1f1f1',
  },
  tabButton: {
    width: '50%',
    paddingVertical: 10,
    // backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center'
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  tabContent: {
    flex: 1,
    paddingVertical: 20,
  },
});