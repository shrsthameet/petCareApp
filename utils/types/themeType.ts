interface TypographyProperties {
  fontSize: number;
}

export interface ITheme {
  colors: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    surfaceDisabled: string;
    onSurfaceDisabled: string;
    backdrop: string;
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };
    text: string;
    card: string;
    border: string;
    notification: string;
    white: string;
  };
  typography: {
    display?: {
      small: TypographyProperties;
      medium: TypographyProperties;
      large: TypographyProperties;
    };
    headline?: {
      small: TypographyProperties;
      medium: TypographyProperties;
      large: TypographyProperties;
    };
    title?: {
      small: TypographyProperties;
      medium: TypographyProperties;
      large: TypographyProperties;
    };
    body?: {
      small: TypographyProperties;
      medium: TypographyProperties;
      large: TypographyProperties;
    };
    caption?: {
      small: TypographyProperties;
      medium: TypographyProperties;
      large: TypographyProperties;
    };
    fontFamily: {
      thin: string;
      thinItalic: string;
      medium: string;
      mediumItalic: string;
      regular: string;
      semiBold: string;
      semiBoldItalic: string;
      bold: string;
      boldItalic: string;
    };
  };
  spacing: {
    xxs: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  sizes: {
    small: number;
    medium: number;
    large: number;
  };
  borderRadius: {
    flat: number;
    curve: number;
    arch: number;
    pill: number;
    circle: number;
  };
  shadows: {
    small: string;
    medium: string;
  };
}
//   colors: {
//     primary: '#3498db',
//     background: '#ffffff',
//     text: '#333333',
//     card: '#f0f0f0',
//     border: '#cccccc',
//     notification: '#ff6347',
//   },
//   typography: {
//     fontSize: {
//       small: 12,
//       medium: 16,
//       large: 20,
//     },
//     fontWeightRegular: '400',
//     fontWeightBold: '700',
//     fontFamily: {
//       regular: 'Roboto-Regular',
//       bold: 'Roboto-Bold',
//       italic: 'Roboto-Italic',
//     },
//   },
//   spacing: {
//     xs: 4,
//     sm: 8,
//     md: 16,
//     lg: 24,
//     xl: 32,
//   },
//   sizes: {
//     small: 10,
//     medium: 20,
//     large: 30,
//   },
//   borderRadius: {
//     small: 4,
//     medium: 8,
//     large: 16,
//   },
//   shadows: {
//     small: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//     medium: '0px 4px 6px rgba(0, 0, 0, 0.15)',
//   },
// };