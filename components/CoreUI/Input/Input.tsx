import React, { useState } from 'react';
import {
  TextInput, TextInputProps, StyleProp, ViewStyle, TextStyle, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from '../Icons/Icons';
import { Column } from '../Flex';
import { getInputStyles } from './Input.style';
import { ShapeType, IconLibraries, SizeType } from '@/utils/types';
import { RootState } from '@/redux/rootReducer';
import { Shape, Size } from '@/utils/enum';

interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  size?: SizeType; // Add size prop
  shape?: ShapeType; // Add isRounded prop
  rightIcon?: boolean; // Right icon component
  leftIcon?: boolean; // Left icon component
  iconName?: string; // Icon name
  iconLibrary?: keyof typeof IconLibraries | 'AntDesign'; // Icon library
  iconSize?: number; // Icon size
  iconColor?: string; // Icon color
  numberOfLines?: number; // Multiline input number of lines
  maxLength?: number; // Maximum number of characters
  editable?: boolean; // Editable prop
}

export const Input: React.FC<InputProps> = ({
  containerStyle,
  inputStyle,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  size = Size.Medium, // Default size
  shape = Shape.Flat, // Default to false
  rightIcon = false,
  leftIcon = false,
  iconName,
  iconLibrary,
  iconSize,
  iconColor,
  numberOfLines, // Multiline prop for number of lines
  maxLength, // Max length for input
  editable = true, // Editable input
  ...rest
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const [isFocused, setIsFocused] = useState(false); // Add focus state

  const styles = getInputStyles(theme, leftIcon, size, shape, isFocused); // Pass focus state to styles
  const customIconColor = iconColor ? iconColor : theme.colors.outline;

  return (
    <Column style={[styles.container, containerStyle as ViewStyle]}>
      <View style={[styles.inputWrapper]}>
        {leftIcon && (
          <Icon
            library={iconLibrary ? iconLibrary : 'AntDesign'}
            name={iconName}
            size={iconSize}
            color={customIconColor}
            style={styles.iconLeft}
          />
        )}
        <TextInput
          style={[
            styles.input,
            multiline && styles.textarea,
            inputStyle,
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines} // Multiline prop for number of lines
          maxLength={maxLength} // Max length for input
          editable={editable} // Editable input
          onFocus={() => setIsFocused(true)} // Handle focus
          onBlur={() => setIsFocused(false)} // Handle blur
          {...rest} // Spread other props like keyboardType, returnKeyType, etc.
        />
        {rightIcon && (
          <Icon
            library={iconLibrary ? iconLibrary : 'AntDesign'}
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={styles.iconRight}
          />
        )}
      </View>
    </Column>
  );
};