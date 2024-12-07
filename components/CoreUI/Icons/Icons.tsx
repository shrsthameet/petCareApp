// Icon.tsx
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { IconLibraries } from '@/utils/types';

// Define types for props
interface IconProps {
  name: undefined | string; // Accept any string for the icon name
  size?: number;
  color?: string;
  library: keyof typeof IconLibraries | 'AntDesign'; // Use the keys of the IconLibraries
  style?: ViewStyle; // Optional additional styles
}

// Create the Icon component
export const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'black', library, style }) => {
  const IconComponent = IconLibraries[library];

  return (
    <View style={style}>
      <IconComponent name={name} size={size} color={color} />
    </View>
  );
};