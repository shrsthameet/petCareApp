import React, { ForwardedRef } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from '../Icons';
import { Typography } from '../Typography';
import { RootState } from '@/redux/rootReducer';
import {
  BorderRadiusType, ButtonVariantType, ColorVariantType, IconLibraries, PositionType, SizeType 
} from '@/utils/types';
import {
  BorderRadius, ButtonVariant, ColorVariant, Size, 
  TypographyVariant
} from '@/utils/enum';

interface ButtonProps {
  variant?: ButtonVariantType;
  color?: ColorVariantType;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: SizeType;
  shape?: BorderRadiusType;
  showIcon?: boolean; // Show icon in button
  iconName?: string; // Icon name
  iconLibrary?: keyof typeof IconLibraries | 'AntDesign'; // Icon library
  iconSize?: number; // Icon size
  iconColor?: string; // Icon color
  iconPosition?: PositionType; // Position of the icon (default is left)
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
      size = Size.Medium,
      shape = BorderRadius.Flat,
      showIcon = false,
      iconName = 'plus',
      iconLibrary,
      iconColor = ColorVariant.Primary,
      iconPosition,
      iconSize = 18
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
      case ButtonVariant.Text:
        return 'transparent';
      default:
        return theme.colors.primary;
      }
    };

    const getTextColor = () => {
      if (disabled) return theme.colors.onSurfaceDisabled;
      switch (variant) {
      case ButtonVariant.Contained:
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
      backgroundColor: getBackgroundColor() as string,
      borderRadius: shape ? theme.borderRadius[shape] : theme.borderRadius.flat,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: variant === ButtonVariant.Outlined ? 1 : 0,
      borderColor: theme.colors[color as keyof typeof theme.colors] as string || theme.colors.primary as string,
      paddingHorizontal: sizeStyles.paddingHorizontal, // Ensure consistent horizontal padding
      paddingVertical: sizeStyles.paddingVertical,   // Ensure consistent vertical padding
      ...style,
    };

    const textStyles: TextStyle = {
      color: getTextColor() as string,
      // fontSize: theme.typography.body?.fontSize || 16,
      // fontWeight: theme.typography.body?.fontWeight || '600',
      ...textStyle,
    };

    // Define spacing for the icon
    const iconSpacing = {
      marginRight: iconPosition === 'left' ? theme.spacing.xs : 0,
      marginLeft: iconPosition === 'right' ? theme.spacing.xs : 0,
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {showIcon && iconPosition === 'left' && iconName && (
          <Icon
            library={iconLibrary ? iconLibrary : 'AntDesign'}
            name={iconName}
            size={iconSize}
            color={'#fff'}
            style={iconSpacing}
          />
        )}
        <Typography variant={TypographyVariant.Body} size={Size.Small}  style={textStyles}>{title}</Typography>
        {showIcon && iconPosition === 'right' && iconName && (
          <Icon
            library={iconLibrary ? iconLibrary : 'AntDesign'}
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={iconSpacing}
          />
        )}
      </TouchableOpacity>
    );
  }
);
