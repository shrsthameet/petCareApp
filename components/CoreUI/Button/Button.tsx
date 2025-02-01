import React, { ForwardedRef, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
  Animated,
  Easing,
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
  iconPosition?: PositionType; // Position of the icon (default is left)
  isLoading?: boolean; // Loading state
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
      iconPosition,
      iconSize = 16,
      isLoading = false, // Default to false
    }: ButtonProps,
    ref: ForwardedRef<View>
  ) => {
    const { theme } = useSelector((state: RootState) => state.theme);

    // Animated value for the loading icon rotation
    const rotation = useRef(new Animated.Value(0)).current;

    // Start animation for the loading icon
    useEffect(() => {
      if (isLoading) {
        Animated.loop(
          Animated.timing(rotation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      } else {
        rotation.setValue(0); // Reset rotation when not loading
      }
    }, [isLoading, rotation]);

    const getBackgroundColor = () => {
      if (disabled || isLoading) return theme.colors.onSurfaceDisabled;
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
      paddingHorizontal: sizeStyles.paddingHorizontal,
      paddingVertical: sizeStyles.paddingVertical,
      ...style,
    };

    const textStyles: TextStyle = {
      color: getTextColor() as string,
      fontSize: sizeStyles.fontSize,
      ...textStyle,
    };

    // Define spacing for the icon
    const iconSpacing = {
      marginRight: iconPosition === Position.Left ? theme.spacing.xs : 0,
      marginLeft: iconPosition === Position.Right ? theme.spacing.xs : 0,
    };

    // Rotate the loading icon using the animated value
    const rotationStyle = {
      transform: [
        {
          rotate: rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled || isLoading} // Disable when loading
        activeOpacity={0.7}
      >
        {isLoading ? (
          <>
            <Animated.View style={[iconSpacing, rotationStyle]}>
              <Icon
                library={iconLibrary ? iconLibrary : 'AntDesign'}
                name={'loading1'}
                size={iconSize}
                color={textStyles.color as string}
              />
            </Animated.View>
            <Typography
              variant={TypographyVariant.Body}
              size={Size.Small}
              style={[textStyles, {
                marginLeft: 5 
              }]}
              fontFamilyStyle={Fonts.Montserrat_Medium}
            >
              Loading..
            </Typography>
          </>
        ) : (
          <>
            {showIcon && iconPosition === Position.Left && iconName && (
              <Icon
                library={iconLibrary ? iconLibrary : 'AntDesign'}
                name={iconName}
                size={iconSize}
                color={textStyles.color as string}
                style={iconSpacing}
              />
            )}
            <Typography
              variant={TypographyVariant.Body}
              size={Size.Small}
              style={textStyles}
              fontFamilyStyle={Fonts.Montserrat_Medium}
            >
              {title}
            </Typography>
            {showIcon && iconPosition === Position.Right && iconName && (
              <Icon
                library={iconLibrary ? iconLibrary : 'AntDesign'}
                name={iconName}
                size={iconSize}
                color={textStyles.color as string}
                style={iconSpacing}
              />
            )}
          </>
        )}
      </TouchableOpacity>
    );
  }
);
