import { Appearance } from 'react-native';
import { ITheme } from '@/utils/types';

// export interface Theme {
//   colors: {
//     primary: string;
//     background: string;
//     text: string;
//     card: string;
//     border: string;
//     notification: string;
//   };
//   typography: {
//     fontSize: {
//       small: number;
//       medium: number;
//       large: number;
//     };
//     fontWeightRegular: string;
//     fontWeightBold: string;
//     fontFamily: {
//       regular: string;
//       bold: string;
//       italic: string;
//     };
//   };
//   spacing: {
//     xs: number;
//     sm: number;
//     md: number;
//     lg: number;
//     xl: number;
//   };
//   sizes: {
//     small: number;
//     medium: number;
//     large: number;
//   };
//   borderRadius: {
//     small: number;
//     medium: number;
//     large: number;
//   };
//   shadows: {
//     small: string;
//     medium: string;
//   };
// }

const lightTheme: ITheme = {
  colors: {
    primary: '#3498db',
    background: '#ffffff',
    text: '#333333',
    card: '#f0f0f0',
    border: '#cccccc',
    notification: '#ff6347',
  },
  typography: {
    display: {
      large: 68,
      medium: 58,
      small: 48,
    },
    fontWeightRegular: '400',
    fontWeightBold: '700',
    fontFamily: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      italic: 'Roboto-Italic',
    },
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

const darkTheme: ITheme = {
  colors: {
    primary: '#3498db',
    background: '#000000',
    text: '#ffffff',
    card: '#f0f0f0',
    border: '#ffffff',
    notification: '#ff6347',
  },
  typography: {
    display: {
      small: 12,
      medium: 16,
      large: 20,
    },
    fontWeightRegular: '400',
    fontWeightBold: '700',
    fontFamily: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      italic: 'Roboto-Italic',
    },
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

const getInitialTheme = (): ITheme => {
  const colorScheme = Appearance.getColorScheme(); // 'light' or 'dark'
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

export {
  lightTheme, darkTheme, getInitialTheme 
};