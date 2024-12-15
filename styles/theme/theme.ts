import { Appearance } from 'react-native';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';
import { ITheme } from '@/utils/types';
import { Theme } from '@/utils/enum';

const getInitialTheme = (): ITheme => {
  const colorScheme = Appearance.getColorScheme(); // 'light' or 'dark'
  return colorScheme === Theme.Dark ? darkTheme : lightTheme;
};

export {
  lightTheme,
  darkTheme,
  getInitialTheme
};