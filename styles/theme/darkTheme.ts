import { baseTypography } from './themeProperties';
import { ITheme } from '@/utils/types';

export const darkTheme: ITheme = {
  colors: {
    primary: 'rgb(220, 184, 255)',
    onPrimary: 'rgb(71, 12, 122)',
    primaryContainer: 'rgb(95, 43, 146)',
    onPrimaryContainer: 'rgb(240, 219, 255)',
    secondary: 'rgb(208, 193, 218)',
    onSecondary: 'rgb(54, 44, 63)',
    secondaryContainer: 'rgb(77, 67, 87)',
    onSecondaryContainer: 'rgb(237, 221, 246)',
    tertiary: 'rgb(243, 183, 190)',
    onTertiary: 'rgb(75, 37, 43)',
    tertiaryContainer: 'rgb(101, 58, 65)',
    onTertiaryContainer: 'rgb(255, 217, 221)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    text: 'rgb(255, 251, 255)',
    onText: 'rgb(29, 27, 30)',
    background: 'rgb(29, 27, 30)',
    onBackground: 'rgb(231, 225, 229)',
    surface: 'rgb(29, 27, 30)',
    onSurface: 'rgb(231, 225, 229)',
    surfaceVariant: 'rgb(74, 69, 78)',
    onSurfaceVariant: 'rgb(204, 196, 206)',
    outline: 'rgb(150, 142, 152)',
    outlineVariant: 'rgb(74, 69, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(231, 225, 229)',
    inverseOnSurface: 'rgb(50, 47, 51)',
    inversePrimary: 'rgb(120, 69, 172)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(39, 35, 41)',
      level2: 'rgb(44, 40, 48)',
      level3: 'rgb(50, 44, 55)',
      level4: 'rgb(52, 46, 57)',
      level5: 'rgb(56, 49, 62)'
    },
    surfaceDisabled: 'rgba(231, 225, 229, 0.12)',
    onSurfaceDisabled: 'rgba(231, 225, 229, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)',
    card: '#f0f0f0',
    border: '#ffffff',
    notification: '#ff6347',
    white: '#fff',
    transparent: 'transparent'
  },
  typography: {
    ...baseTypography
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 14,
    lg: 18,
    xl: 22,
    xxl: 32
  },
  sizes: {
    small: 10,
    medium: 20,
    large: 30,
  },
  borderRadius: {
    flat: 0,
    curve: 4,
    arch: 15,
    pill: 25,
    circle: 50
  },
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0px 4px 6px rgba(0, 0, 0, 0.15)',
  },
};