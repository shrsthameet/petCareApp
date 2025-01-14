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
    text: string;
    onText: string;
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
    card: string;
    border: string;
    notification: string;
    white: string;
    transparent: string;
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
    xxl: number;
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