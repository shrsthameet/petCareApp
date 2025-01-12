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
  ShapeType, ButtonVariantType, ColorVariantType, IconLibraries, PositionType, SizeType 
} from '@/utils/types';
import {
  Shape, ButtonVariant, ColorVariant, FlexAlignItems, FlexDirection, FlexJustifyContent, Fonts, Position, Size, 
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
  shape?: ShapeType;
  showIcon?: boolean; // Show icon in button
  iconName?: string; // Icon name
  iconLibrary?: keyof typeof IconLibraries | 'AntDesign'; // Icon library
  iconSize?: number; // Icon size
  // iconColor?: string; // Icon color
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
      shape = Shape.Flat,
      showIcon = false,
      iconName = 'plus',
      iconLibrary,
      // iconColor = ColorVariant.Primary,
      iconPosition,
      iconSize = 16
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
      xsmall: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.xs,
        fontSize: theme.typography.caption?.large.fontSize,
      },
      small: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        fontSize: theme.typography.caption?.large.fontSize,
      },
      medium: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        fontSize: theme.typography.body?.medium.fontSize,
      },
      large: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        fontSize: theme.typography.body?.large.fontSize,
      },
      xlarge: {
        paddingVertical: theme.spacing.xl,
        paddingHorizontal: theme.spacing.xl,
        fontSize: theme.typography.caption?.large.fontSize,
      },
    }[size];

    const buttonStyles: ViewStyle = {
      backgroundColor: getBackgroundColor() as string,
      borderRadius: shape ? theme.borderRadius[shape] : theme.borderRadius.flat,
      display: 'flex',
      flexDirection: FlexDirection.Row,
      alignItems: FlexAlignItems.Center,
      justifyContent: FlexJustifyContent.Center,
      borderWidth: variant === ButtonVariant.Outlined ? 1 : 0,
      borderColor: theme.colors[color as keyof typeof theme.colors] as string || theme.colors.primary as string,
      paddingHorizontal: sizeStyles.paddingHorizontal, // Ensure consistent horizontal padding
      paddingVertical: sizeStyles.paddingVertical, // Ensure consistent vertical padding
      ...style,
    };

    const textStyles: TextStyle = {
      color: getTextColor() as string,
      fontSize: sizeStyles.fontSize,
      // fontSize: theme.typography.body?.fontSize || 16,
      // fontWeight: theme.typography.body?.fontWeight || '600',
      ...textStyle,
    };

    // Define spacing for the icon
    const iconSpacing = {
      marginRight: iconPosition === Position.Left ? theme.spacing.xs : 0,
      marginLeft: iconPosition === Position.Right ? theme.spacing.xs : 0,
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {showIcon && iconPosition === Position.Left && iconName && (
          <Icon
            library={iconLibrary ? iconLibrary : 'AntDesign'}
            name={iconName}
            size={iconSize}
            color={textStyles.color as string}
            style={iconSpacing}
          />
        )}
        <Typography variant={TypographyVariant.Body} size={Size.Small} style={textStyles} fontFamilyStyle={Fonts.Montserrat_Medium}>{title}</Typography>
        {showIcon && iconPosition === Position.Right && iconName && (
          <Icon
            library={iconLibrary ? iconLibrary : 'AntDesign'}
            name={iconName}
            size={iconSize}
            color={textStyles.color as string}
            style={iconSpacing}
          />
        )}
      </TouchableOpacity>
    );
  }
);
