import { baseTypography } from './themeProperties';
import { ITheme } from '@/utils/types';

export const lightTheme: ITheme = {
  colors: {
    primary: '#3498db',
    background: '#ffffff',
    text: '#333333',
    card: '#f0f0f0',
    border: '#cccccc',
    notification: '#ff6347',
    white: '#fff'
  },
  typography: {
    ...baseTypography
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  sizes: {
    small: 10,
    medium: 20,
    large: 30,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0px 4px 6px rgba(0, 0, 0, 0.15)',
  },
};