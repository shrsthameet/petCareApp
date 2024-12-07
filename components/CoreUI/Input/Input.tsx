import React from 'react';
import {
  TextInput, TextInputProps, StyleProp, ViewStyle, TextStyle, View
} from 'react-native';
import { FlexContainer } from '../FlexContainer';
import { Icon } from '../Icons/Icons';
import { inputStyles } from './Input.style';
import { IconLibraries } from '@/utils/types';

interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  size?: 'small' | 'medium' | 'large'; // Add size prop
  isRounded?: boolean; // Add isRounded prop
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
  size = 'medium', // Default size
  isRounded = false, // Default to false
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
  // const getInputHeight = () => {
  //   switch (size) {
  //   case 'small': return 40;
  //   case 'large': return 60;
  //   default: return 50; // medium as default
  //   }
  // };

  return (
    <FlexContainer style={[inputStyles().container, containerStyle as ViewStyle]}>
      <View style={inputStyles().inputWrapper}>
        {leftIcon && (
          <Icon
            library={iconLibrary ? iconLibrary : 'AntDesign'}
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={inputStyles().iconLeft}
          />
        )}
        <TextInput
          style={[
            inputStyles(leftIcon).input,
            multiline && inputStyles().textarea,
            {
              // height: getInputHeight() 
            }, // Adjust height based on size prop
            isRounded && inputStyles().rounded, // Apply rounded style if isRounded is true
            inputStyle,
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines} // Multiline prop for number of lines
          maxLength={maxLength} // Max length for input
          editable={editable} // Editable input
          {...rest} // Spread other props like keyboardType, returnKeyType, etc.
        />
        {rightIcon && (
          <Icon
            library={iconLibrary ? iconLibrary : 'AntDesign'}
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={inputStyles().iconRight}
          />
        )}
      </View>
    </FlexContainer>
  );
};
