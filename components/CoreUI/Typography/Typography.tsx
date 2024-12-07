import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { Fonts, Size } from '@/utils/enum';
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
  variant = 'display', // Default to bodyMedium
  size = Size.Medium,
  style = {
  },
  fontWeight = 500, // Default to regular weight
  color, // Optionally pass color as prop
  textAlign, // Optionally pass textAlign as prop
  letterSpacing = 0.2, // Default letter spacing
  lineHeight,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  // Set the default font family to Montserrat
  const fontFamily = Fonts.Montserrat_Regular; // Default to regular if not found

  return (
    <Text
      style={[
        // variantStyles[variant], // Base style depending on variant
        
        {
          fontSize: theme.typography[variant]?.[size] ?? 14,
          fontFamily,
          letterSpacing,
          lineHeight,
          fontWeight
        }, // Apply the selected font family
        color ? {
          color 
        } : {
        }, // Apply color if provided
        textAlign ? {
          textAlign 
        } : {
        }, // Apply textAlign if provided
        style, // Merge with any additional custom styles
      ]}
    >
      {children}
    </Text>
  );
};