import React from 'react';
import {
  Text, TextStyle, StyleSheet, Platform 
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  Fonts, OSType, Size, TypographyVariant 
} from '@/utils/enum';
import {
  SizeType, TypographyFontType, TypographyTextAlign, TypographyVariantsType 
} from '@/utils/types';
import { RootState } from '@/redux/rootReducer';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariantsType;
  size?: SizeType;
  style?: TextStyle | TextStyle[];
  fontFamilyStyle?: TypographyFontType;
  color?: string;
  textAlign?: TypographyTextAlign;
  letterSpacing?: number;
  lineHeight?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = TypographyVariant.Body,
  size = Size.Medium,
  style = {
  },
  fontFamilyStyle,
  color,
  textAlign,
  letterSpacing = 0.2,
  lineHeight,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  // Function to switch font based on platform
  const getFontFamily = (fontFamilyStyle: TypographyFontType): string => {
    if (Platform.OS === OSType.ANDROID) {
      switch (fontFamilyStyle) {
      case Fonts.Montserrat_Medium:
        return Fonts.Montserrat_SemiBold;
      case Fonts.Montserrat_SemiBold:
        return Fonts.Montserrat_Bold;
      case Fonts.Montserrat_Bold:
        return Fonts.Montserrat_Bold;
      default:
        return fontFamilyStyle;
      }
    }
    return fontFamilyStyle;
  };

  const fontFamily = fontFamilyStyle ? getFontFamily(fontFamilyStyle) : Fonts.Montserrat_Regular;

  const typography = theme.typography[variant]?.[size];
  const fontSize = typography?.fontSize;
  const fontColor = color ? color : theme.colors.onBackground;

  const baseStyle: TextStyle = {
    fontSize,
    fontFamily,
    letterSpacing,
    lineHeight,
  };

  const additionalStyles = StyleSheet.flatten([
    color ? {
      color: fontColor 
    } : {
    },
    textAlign ? {
      textAlign 
    } : {
    },
    style,
  ]);

  return <Text style={[baseStyle, additionalStyles]}>{children}</Text>;
};