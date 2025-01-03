import { StyleSheet } from 'react-native';
import { ITheme, ShapeType, SizeType } from '@/utils/types';
import { Shape, Size } from '@/utils/enum';

function getSize(theme: ITheme, size?: SizeType) {
  switch (size) {
  case Size.Small:
    return theme.spacing.xs;
  case Size.Medium:
    return theme.spacing.sm;
  case Size.Large:
    return theme.spacing.md;
  default:
    return theme.spacing.sm;
  }
}

export const getInputStyles = (
  theme: ITheme,
  leftIcon?: boolean,
  size?: SizeType,
  shape?: ShapeType,
  isFocused?: boolean // Pass focus state
) =>
  StyleSheet.create({
    container: {
      paddingVertical: 2,
    },
    inputWrapper: {
      position: 'relative',
      justifyContent: 'center',
    },
    input: {
      outline: isFocused ? theme.colors.primary : theme.colors.surfaceVariant, // Change border color on focus
      borderColor: isFocused ? theme.colors.primary : theme.colors.surfaceVariant,
      borderWidth: 1,
      borderRadius: shape ? theme.borderRadius[shape] : theme.borderRadius[Shape.Flat],
      paddingVertical: getSize(theme, size),
      fontSize: 16,
      color: theme.colors.onBackground,
      paddingLeft: leftIcon ? 45 : 15, // Default padding for text
    },
    textarea: {
      height: 150,
      textAlignVertical: 'top',
      paddingVertical: 10,
    },
    iconLeft: {
      position: 'absolute',
      left: 10,
      zIndex: 1,
    },
    iconRight: {
      position: 'absolute',
      right: 10,
      zIndex: 1,
    },
  });