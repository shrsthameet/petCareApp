import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { Fonts, Size, TypographyVariant } from '@/utils/enum';
import { SizeType, TypographyTextAlign, TypographyVariantsType } from '@/utils/types';
import { RootState } from '@/redux/rootReducer';

// Define the props interface
interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariantsType;
  size?: SizeType;
  style?: TextStyle | TextStyle[];
  fontWeight?: TextStyle['fontWeight']; // Use numeric keys for font weights
  color?: string;
  textAlign?: TypographyTextAlign;
  letterSpacing?: number; // Add letterSpacing prop
  lineHeight?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = TypographyVariant.Body, // Default to bodyMedium
  size = Size.Medium,
  style = {
  },
  fontWeight, // Default to regular weight
  color, // Optionally pass color as prop
  textAlign, // Optionally pass textAlign as prop
  letterSpacing = 0.2, // Default letter spacing
  lineHeight,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  
  // Set the default font family to Montserrat
  const fontFamily = theme.typography.fontFamily?.regular ?? Fonts.Montserrat_Regular; // Default to regular if not found

  // Get the typography object for the selected variant and size
  const typography = theme.typography[variant]?.[size];
  const fontSize = typography?.fontSize;
  const fontWeightFromTheme = fontWeight ? fontWeight : theme.typography[variant]?.[size]?.fontWeight;

  const computedStyle = [
    {
      fontSize,
      fontFamily,
      letterSpacing,
      lineHeight,
      fontWeight: fontWeightFromTheme,
    },
    color ? {
      color 
    } : {
    },
    textAlign ? {
      textAlign 
    } : {
    },
    style,
  ];

  return (
    <Text style={computedStyle}>
      {children}
    </Text>
  );
};