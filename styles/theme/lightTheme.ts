import { baseTypography } from './themeProperties';
import { ITheme } from '@/utils/types';

export const lightTheme: ITheme = {
  colors: {
    primary: 'rgb(1, 160, 195)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(229, 251, 255)',
    onPrimaryContainer: 'rgb(1, 181, 217)',
    secondary: 'rgb(164, 240, 255)', // New secondary
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(201,247,255)',
    onSecondaryContainer: 'rgb(1,155,186)',
    tertiary: 'rgb(180, 75, 60)', // New tertiary
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 205, 195)',
    onTertiaryContainer: 'rgb(90, 30, 20)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    text: 'rgb(255, 251, 255)',
    onText: 'rgb(29, 27, 30)',
    background: 'rgb(243, 252, 255)',
    onBackground: 'rgb(0, 0, 0)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(29, 27, 30)',
    surfaceVariant: 'rgb(233, 223, 235)',
    onSurfaceVariant: 'rgb(74, 69, 78)',
    outline: 'rgb(124, 117, 126)',
    outlineVariant: 'rgb(204, 196, 206)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(50, 47, 51)',
    inverseOnSurface: 'rgb(245, 239, 244)',
    inversePrimary: 'rgb(220, 184, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 242, 251)',
      level2: 'rgb(244, 236, 248)',
      level3: 'rgb(240, 231, 246)',
      level4: 'rgb(239, 229, 245)',
      level5: 'rgb(236, 226, 243)'
    },
    surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)',
    card: '#f0f0f0',
    border: '#cccccc',
    notification: '#ff6347',
    white: '#fff'
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
    arch: 10,
    pill: 25,
    circle: 50
  },
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0px 4px 6px rgba(0, 0, 0, 0.15)',
  },
};