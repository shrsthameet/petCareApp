import React, { ForwardedRef } from 'react';
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import { ButtonVariantType, ColorVariantType, SizeType } from '@/utils/types';
import { ButtonVariant, ColorVariant, Size } from '@/utils/enum';

interface ButtonProps {
  variant?: ButtonVariantType;
  color?: ColorVariantType;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: SizeType;
}

export const Button = (
  (
    {
      variant = ButtonVariant.Contained,
      color = ColorVariant.Primary,
      title,
      onPress,
      disabled = false,
      style,
      textStyle,
      size = Size.Medium
    }: ButtonProps,
    ref: ForwardedRef<View>
  ) => {
    const { theme } = useSelector((state: RootState) => state.theme);

    // Determine background and text color based on variants and color
    const getBackgroundColor = () => {
      if (disabled) return theme.colors.surfaceDisabled;
      switch (variant) {
      case ButtonVariant.Contained:
        return theme.colors[color.toLowerCase() as keyof typeof theme.colors] || theme.colors.primary;
      case ButtonVariant.Outlined:
        return theme.colors[color.toLowerCase() as keyof typeof theme.colors] || theme.colors.primary;
      case ButtonVariant.Text:
        return theme.colors[color.toLowerCase() as keyof typeof theme.colors] || theme.colors.primary;
      case ButtonVariant.Elevated:
        return theme.colors[color.toLowerCase() as keyof typeof theme.colors] || theme.colors.primary;
      case ButtonVariant.ContainedTonal:
        return theme.colors.primaryContainer;
      default:
        return theme.colors.primary;
      }
    };

    const getTextColor = () => {
      if (disabled) return theme.colors.onSurfaceDisabled;
      switch (variant) {
      case ButtonVariant.Contained:
      case ButtonVariant.Elevated:
      case ButtonVariant.ContainedTonal:
        return theme.colors.onPrimary;
      case ButtonVariant.Outlined:
      case ButtonVariant.Text:
        return theme.colors[color.toLowerCase() as keyof typeof theme.colors] || theme.colors.primary;
      default:
        return theme.colors.onPrimary;
      }
    };

    // Define size-based styles
    const sizeStyles = {
      small: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        fontSize: theme.typography.body?.small.fontSize ? theme.typography.body.small.fontSize : 14,
      },
      medium: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        fontSize: theme.typography.body?.medium.fontSize || 16,
      },
      large: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        fontSize: theme.typography.body?.large.fontSize ? theme.typography.body.large.fontSize : 18,
      },
    }[size];

    const buttonStyles: ViewStyle = {
      backgroundColor: getBackgroundColor(),
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: variant === ButtonVariant.Outlined ? 1 : 0,
      borderColor: theme.colors[color.toLowerCase() as keyof typeof theme.colors] || theme.colors.primary,
      ...sizeStyles,
      ...style,
    };

    const textStyles: TextStyle = {
      color: getTextColor(),
      // fontSize: theme.typography.body?.fontSize || 16,
      // fontWeight: theme.typography.body?.fontWeight || '600',
      ...textStyle,
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={textStyles}>{title}</Text>
      </TouchableOpacity>
    );
  }
);
