import { TextStyle } from 'react-native';

export const baseTypography = {
  display: {
    small: {
      fontSize: 44,
      fontWeight: '500' as TextStyle['fontWeight']
    },
    medium: {
      fontSize: 54,
      fontWeight: '600' as TextStyle['fontWeight']
    },
    large: {
      fontSize: 68,
      fontWeight: '700' as TextStyle['fontWeight']
    },
  },
  headline: {
    small: {
      fontSize: 24,
      fontWeight: '500' as TextStyle['fontWeight']
    },
    medium: {
      fontSize: 26,
      fontWeight: '500' as TextStyle['fontWeight']
    },
    large: {
      fontSize: 30,
      fontWeight: '500' as TextStyle['fontWeight']
    },
  },
  title: {
    small: {
      fontSize: 16,
      fontWeight: '500' as TextStyle['fontWeight']
    },
    medium: {
      fontSize: 18,
      fontWeight: '500' as TextStyle['fontWeight']
    },
    large: {
      fontSize: 22,
      fontWeight: '500' as TextStyle['fontWeight']
    },
  },
  body: {
    small: {
      fontSize: 12,
      fontWeight: '400' as TextStyle['fontWeight']
    },
    medium: {
      fontSize: 16,
      fontWeight: '400' as TextStyle['fontWeight']
    },
    large: {
      fontSize: 20,
      fontWeight: '500' as TextStyle['fontWeight']
    },
  },
  caption: {
    small: {
      fontSize: 9,
      fontWeight: '600' as TextStyle['fontWeight']
    },
    medium: {
      fontSize: 10,
      fontWeight: '500' as TextStyle['fontWeight']
    },
    large: {
      fontSize: 11,
      fontWeight: '500' as TextStyle['fontWeight']
    },
  },
  fontFamily: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    italic: 'Roboto-Italic',
  },
};